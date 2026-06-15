#!/usr/bin/env bash

# ==============================================================================
# JDM Group - Automated Linux Deployment Script
# Target OS: Ubuntu 22.04 LTS / 24.04 LTS
# Description: Automates system setup, permissions, Gunicorn, Nginx, and PM2.
# ==============================================================================

# Exit immediately if any command fails
set -euo pipefail

# Define text formatting variables
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}====================================================${NC}"
echo -e "${GREEN}    JDM Group - Automated Deployment Script        ${NC}"
echo -e "${GREEN}====================================================${NC}"

# Check if script is run as root
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Error: This script must be run with sudo privileges.${NC}"
  echo "Please run: sudo ./deploy.sh"
  exit 1
fi

# ==============================================================================
# 1. Configuration & Input Arguments
# ==============================================================================
read -p "Enter frontend domain name (e.g., jdmgroup.com): " FRONTEND_DOMAIN
read -p "Enter backend API domain name (e.g., api.jdmgroup.com): " BACKEND_DOMAIN
read -p "Enter email address for SSL certificate alerts (e.g., admin@jdmgroup.com): " EMAIL_ADDRESS

PROJECT_DIR="/var/www/jdm"
BACKEND_DIR="$PROJECT_DIR/jdm_backend/jdm_backend"
FRONTEND_DIR="$PROJECT_DIR/jdm_frontend"

echo -e "\n${YELLOW}Deployment configurations:${NC}"
echo "-----------------------------------"
echo "Frontend Domain:  $FRONTEND_DOMAIN"
echo "Backend Domain:   $BACKEND_DOMAIN"
echo "Email (SSL):      $EMAIL_ADDRESS"
echo "Project Dir:      $PROJECT_DIR"
echo "-----------------------------------"
read -p "Does this look correct? (y/n) " CONFIRM
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
  echo -e "${RED}Deployment cancelled.${NC}"
  exit 1
fi

# ==============================================================================
# 2. System Packages & Dependencies Installation
# ==============================================================================
echo -e "\n${YELLOW}[1/7] Installing System Dependencies...${NC}"
apt update
apt upgrade -y
apt install -y python3-pip python3-venv python3-dev libpq-dev git curl nginx certbot python3-certbot-nginx

# Install Node.js (v20)
if ! command -v node &> /dev/null; then
  echo "Installing Node.js v20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
fi

# Install PM2 globally
npm install --global pm2

# ==============================================================================
# 3. Setup Folders and Casing Alignment
# ==============================================================================
echo -e "\n${YELLOW}[2/7] Aligning Directory and Permissions...${NC}"
mkdir -p "$PROJECT_DIR"

# Copy repository files to project directory if not already there
if [ "$(pwd)" != "$PROJECT_DIR" ]; then
  echo "Copying files to $PROJECT_DIR..."
  cp -R ./* "$PROJECT_DIR/" || true
  cd "$PROJECT_DIR"
fi

# ==============================================================================
# 4. Backend Deployment (Django + Gunicorn + SQLite)
# ==============================================================================
echo -e "\n${YELLOW}[3/7] Setting up Django Backend...${NC}"
cd "$BACKEND_DIR"

# Set up python virtual environment
python3 -m venv venv
./venv/bin/pip install --upgrade pip
./venv/bin/pip install -r requirements.txt gunicorn

# Generate a Django Environment Configuration File (.env)
cat <<EOF > .env
DEBUG=False
SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(50))")
ALLOWED_HOSTS=$BACKEND_DOMAIN,$FRONTEND_DOMAIN,127.0.0.1,localhost
EOF

# Collect static files
./venv/bin/python manage.py collectstatic --noinput

# Set SQLite database & media directory permissions
echo "Applying SQLite database & media folder permissions..."
chown -R www-data:www-data "$BACKEND_DIR"
chmod 775 "$BACKEND_DIR"
if [ -f "$BACKEND_DIR/db.sqlite3" ]; then
  chmod 664 "$BACKEND_DIR/db.sqlite3"
fi
mkdir -p "$BACKEND_DIR/media"
chmod -R 775 "$BACKEND_DIR/media"

# Create Gunicorn Systemd service file
echo "Creating Gunicorn Systemd service..."
cat <<EOF > /etc/systemd/system/gunicorn.service
[Unit]
Description=gunicorn daemon for JDM Django Backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=$BACKEND_DIR
ExecStart=$BACKEND_DIR/venv/bin/gunicorn \\
          --access-logfile - \\
          --workers 3 \\
          --bind 127.0.0.1:8000 \\
          app.wsgi:application

[Install]
WantedBy=multi-user.target
EOF

# Restart and enable Gunicorn daemon
systemctl daemon-reload
systemctl restart gunicorn
systemctl enable gunicorn

# ==============================================================================
# 5. Frontend Deployment (Next.js + PM2)
# ==============================================================================
echo -e "\n${YELLOW}[4/7] Setting up Next.js Frontend...${NC}"
cd "$FRONTEND_DIR"

# Write production environment file for frontend build
cat <<EOF > .env.production
NEXT_PUBLIC_BASE_URL=https://$BACKEND_DOMAIN
NEXT_PUBLIC_API_URL=https://$BACKEND_DOMAIN
NEXT_PUBLIC_API_URL_V1=https://$BACKEND_DOMAIN/api/v1
EOF

npm install
npm run build

# Start or restart PM2 process
if pm2 show jdm-frontend &>/dev/null; then
  echo "Restarting existing PM2 process..."
  pm2 restart jdm-frontend
else
  echo "Spinning up new PM2 process..."
  pm2 start npm --name "jdm-frontend" -- start
fi

# Configure PM2 startup scripts to restart on boot
pm2 save
pm2 startup systemd -u $USER --hp $HOME || true

# ==============================================================================
# 6. Nginx Config Setup
# ==============================================================================
echo -e "\n${YELLOW}[5/7] Configures Nginx Reverse Proxy...${NC}"

NGINX_CONF="/etc/nginx/sites-available/jdm"

cat <<EOF > "$NGINX_CONF"
# 1. Frontend Configuration
server {
    listen 80;
    server_name $FRONTEND_DOMAIN www.$FRONTEND_DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}

# 2. Backend Configuration
server {
    listen 80;
    server_name $BACKEND_DOMAIN;

    client_max_body_size 50M;

    location /static/ {
        alias $BACKEND_DIR/staticfiles/;
    }

    location /media/ {
        alias $BACKEND_DIR/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Activate sites-enabled link if not exists
if [ ! -f /etc/nginx/sites-enabled/jdm ]; then
  ln -s "$NGINX_CONF" /etc/nginx/sites-enabled/
fi

# Test Nginx syntax and reload
nginx -t
systemctl restart nginx

# ==============================================================================
# 7. Let's Encrypt SSL Config
# ==============================================================================
echo -e "\n${YELLOW}[6/7] Securing Website with SSL (Certbot)...${NC}"

# Request certbot SSL certificate (non-interactive, automatically redirecting traffic)
certbot --nginx \
        --agree-tos \
        --no-eff-email \
        --redirect \
        -m "$EMAIL_ADDRESS" \
        -d "$FRONTEND_DOMAIN" \
        -d "www.$FRONTEND_DOMAIN" \
        -d "$BACKEND_DOMAIN"

# ==============================================================================
# 8. Post-installation summary
# ==============================================================================
echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}    Installation Complete & SSL Secured!           ${NC}"
echo -e "${GREEN}====================================================${NC}"
echo -e "Frontend active at:  ${YELLOW}https://$FRONTEND_DOMAIN${NC}"
echo -e "Backend API active at: ${YELLOW}https://$BACKEND_DOMAIN${NC}"
echo -e "Admin Panel active at: ${YELLOW}https://$BACKEND_DOMAIN/admin/${NC}"
echo "-----------------------------------"
echo "Control commands:"
echo " - View Backend logs:    sudo journalctl -u gunicorn -f"
echo " - View Frontend logs:   pm2 logs jdm-frontend"
echo " - Restart Backend:      sudo systemctl restart gunicorn"
echo " - Restart Frontend:     pm2 restart jdm-frontend"
echo " - Restart Web server:   sudo systemctl restart nginx"
echo "===================================================="
EOF
