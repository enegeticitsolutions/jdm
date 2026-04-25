# Linux Deployment Guide (Frontend + Backend)

This guide deploys:
- Frontend (Next.js): `https://jdm.datamoshtechnologies.com`
- Backend (Django API): `https://api.jdm.datamoshtechnologies.com`

It uses:
- `Nginx` as reverse proxy
- `Gunicorn` for Django
- `PM2` for Next.js
- `systemd` for auto-start
- `Certbot` for SSL

## 1) DNS setup

Create records in your DNS panel:
- `A` -> `jdm.datamoshtechnologies.com` -> your server public IP
- `A` -> `api.jdm.datamoshtechnologies.com` -> your server public IP
- optional `A` -> `www.jdm.datamoshtechnologies.com` -> same IP

Wait for DNS propagation before SSL.

## 2) Server packages

```bash
sudo apt update
sudo apt install -y nginx python3 python3-venv python3-pip nodejs npm certbot python3-certbot-nginx
sudo npm install -g pm2
```

## 3) Folder structure on server

Recommended paths:

```text
/var/www/jdm/
  jdm_backend/
  jdm_frontend/
```

Copy your project there.

## 4) Backend deploy (Django)

```bash
cd /var/www/jdm/jdm_backend/jdm_backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r ../requirement.txt
```

Create backend env file:

```bash
cp ../.env.example ../.env
nano ../.env
```

Run migrations/static:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

Test gunicorn manually once:

```bash
gunicorn app.wsgi:application --bind 127.0.0.1:8000
```

Stop with `Ctrl+C`.

## 5) Backend systemd service

Create file:

```bash
sudo nano /etc/systemd/system/jdm-backend.service
```

Paste:

```ini
[Unit]
Description=JDM Django Backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/jdm/jdm_backend/jdm_backend
EnvironmentFile=/var/www/jdm/jdm_backend/.env
ExecStart=/var/www/jdm/jdm_backend/jdm_backend/.venv/bin/gunicorn app.wsgi:application --bind 127.0.0.1:8000 --workers 3 --timeout 120
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable/start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable jdm-backend
sudo systemctl start jdm-backend
sudo systemctl status jdm-backend
```

## 6) Frontend deploy (Next.js)

```bash
cd /var/www/jdm/jdm_frontend
cp .env.example .env.production
nano .env.production
npm install
npm run build
pm2 start npm --name jdm-frontend -- start
pm2 save
pm2 startup
```

Run command shown by `pm2 startup` to auto-start after reboot.

## 7) Nginx config

Create config:

```bash
sudo nano /etc/nginx/sites-available/jdm.conf
```

Paste:

```nginx
server {
    listen 80;
    server_name jdm.datamoshtechnologies.com www.jdm.datamoshtechnologies.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name api.jdm.datamoshtechnologies.com;

    location /media/ {
        alias /var/www/jdm/jdm_backend/jdm_backend/media/;
    }

    location /static/ {
        alias /var/www/jdm/jdm_backend/jdm_backend/staticfiles/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and validate:

```bash
sudo ln -s /etc/nginx/sites-available/jdm.conf /etc/nginx/sites-enabled/jdm.conf
sudo nginx -t
sudo systemctl reload nginx
```

## 8) SSL with Certbot

```bash
sudo certbot --nginx -d jdm.datamoshtechnologies.com -d www.jdm.datamoshtechnologies.com -d api.jdm.datamoshtechnologies.com
```

Test renewal:

```bash
sudo certbot renew --dry-run
```

## 9) Verify endpoints

Run these after deployment:

```bash
curl -I https://jdm.datamoshtechnologies.com
curl -I https://api.jdm.datamoshtechnologies.com/api/v1/home/
curl -I https://api.jdm.datamoshtechnologies.com/media/
```

## 10) Update workflow (new code)

Backend:

```bash
cd /var/www/jdm/jdm_backend/jdm_backend
source .venv/bin/activate
pip install -r ../requirement.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart jdm-backend
```

Frontend:

```bash
cd /var/www/jdm/jdm_frontend
npm install
npm run build
pm2 restart jdm-frontend
```

## Notes

- `.gitignore` now blocks secrets, node modules, runtime media, logs, and heavy archives.
- If files were already tracked earlier, run `git rm --cached <file>` once to untrack them.
