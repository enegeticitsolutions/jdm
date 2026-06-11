#!/bin/bash

# ==============================================================================
# JDM Group — Backend Production Deployment Automation Script
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

echo "=== Starting JDM Backend Deployment ==="

# 1. Update source code
echo "Fetching latest changes from Git..."
git pull origin main

# 2. Activate virtual environment
if [ -d "venv" ]; then
    echo "Activating virtual environment (venv)..."
    source venv/bin/activate
elif [ -d "../venv" ]; then
    echo "Activating virtual environment (../venv)..."
    source ../venv/bin/activate
else
    echo "WARNING: No 'venv' folder found in backend root. Proceeding without activation..."
fi

# 3. Install dependencies
if [ -f "requirement.txt" ]; then
    echo "Installing/updating dependencies from requirement.txt..."
    pip install -r requirement.txt
elif [ -f "../requirement.txt" ]; then
    echo "Installing/updating dependencies from ../requirement.txt..."
    pip install -r ../requirement.txt
else
    echo "WARNING: No requirement.txt found. Skipping pip install..."
fi

# 4. Navigate to Django project root (where manage.py is)
if [ -f "jdm_backend/manage.py" ]; then
    cd jdm_backend
elif [ -f "manage.py" ]; then
    # Already in correct directory
    :
else
    echo "ERROR: Could not find manage.py. Ensure you are running this from the backend folder."
    exit 1
fi

# 5. Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# 6. Load database fixtures (seed data)
if [ -f "fixtures_content.json" ]; then
    echo "Loading data from fixtures_content.json..."
    python manage.py loaddata fixtures_content.json
else
    echo "WARNING: fixtures_content.json not found. Database seeding skipped."
fi

# 7. Collect static files for web server (Nginx)
echo "Collecting static files..."
python manage.py collectstatic --noinput

# 8. Restart backend web server
echo "Restarting application service..."
if command -v systemctl &> /dev/null; then
    # Systemd services (adjust service name as appropriate, e.g. jdm-backend)
    echo "Attempting to restart gunicorn via systemctl..."
    sudo systemctl restart jdm-backend || echo "gunicorn restart skipped (service not registered or permission denied)"
elif command -v pm2 &> /dev/null; then
    # PM2 process manager
    echo "Attempting to restart backend via PM2..."
    pm2 restart jdm-backend || pm2 restart app || echo "PM2 restart skipped"
else
    echo "NOTICE: Deployment complete. Please restart your WSGI/ASGI application worker (gunicorn/uwsgi/PM2) manually."
fi

echo "=== Deployment Completed Successfully! ==="
