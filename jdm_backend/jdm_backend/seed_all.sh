#!/usr/bin/env bash
set -euo pipefail

# Find and activate python virtual environment
if [ -d "../.venv" ]; then
    echo "Activating virtualenv from ../.venv..."
    source ../.venv/bin/activate
elif [ -d "../venv" ]; then
    echo "Activating virtualenv from ../venv..."
    source ../venv/bin/activate
else
    echo "Warning: Python virtual environment not found in ../venv or ../.venv. Using global python."
fi

echo -e "\n=== [1/3] Running Full Database Seeding ==="
python seed_full.py

echo -e "\n=== [2/3] Running Clientele Logos Seeding ==="
python seed_clientele.py

echo -e "\n=== [3/3] Running Performance Achievements Seeding ==="
python seed_old_achievements.py

echo -e "\n=== [Post-Seed] Restarting Gunicorn Server ==="
if command -v systemctl &> /dev/null && systemctl is-active --quiet gunicorn; then
    sudo systemctl restart gunicorn
    echo "Gunicorn service restarted successfully."
else
    echo "Gunicorn service not running or systemctl not available. Skipped service restart."
fi

echo -e "\nDatabase seeding completed successfully!"
EOF
