# JDM Domain Deployment (Linux)

This project is now configured for:
- Frontend: `https://jdm.datamoshtechnologies.com`
- Backend API: `https://api.jdm.datamoshtechnologies.com`

## 1) DNS

Create DNS records:
- `A` record: `jdm.datamoshtechnologies.com` -> your server public IP
- `A` record: `api.jdm.datamoshtechnologies.com` -> same server IP (or API server IP if separate)
- Optional: `www.jdm.datamoshtechnologies.com` -> same IP

## 2) Backend env (`jdm_backend/.env`)

Use `jdm_backend/.env.example` as base.

Minimum values:
- `DJANGO_DEBUG=False`
- `DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,api.jdm.datamoshtechnologies.com,jdm.datamoshtechnologies.com,www.jdm.datamoshtechnologies.com`
- `DJANGO_CORS_ALLOWED_ORIGINS=https://jdm.datamoshtechnologies.com,https://www.jdm.datamoshtechnologies.com`
- `DJANGO_CSRF_TRUSTED_ORIGINS=https://jdm.datamoshtechnologies.com,https://www.jdm.datamoshtechnologies.com,https://api.jdm.datamoshtechnologies.com`
- `FRONTEND_PUBLIC_URL=https://jdm.datamoshtechnologies.com`

## 3) Frontend env (`jdm_frontend/.env.production`)

Already prepared with:
- `NEXT_PUBLIC_API_URL=https://api.jdm.datamoshtechnologies.com`
- `NEXT_PUBLIC_API_URL_V1=https://api.jdm.datamoshtechnologies.com/api/v1`
- `NEXT_PUBLIC_BASE_URL=https://api.jdm.datamoshtechnologies.com`

## 4) Backend run with Gunicorn

Example (from `jdm_backend/jdm_backend`):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r ../requirement.txt
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn app.wsgi:application --bind 127.0.0.1:8000
```

## 5) Frontend run with PM2

Example (from `jdm_frontend`):

```bash
npm install
npm run build
pm2 start npm --name jdm-frontend -- start
pm2 save
```

By default Next.js serves on port `3000`.

## 6) Nginx reverse proxy

Use one server block for frontend and one for API:

```nginx
server {
    server_name jdm.datamoshtechnologies.com www.jdm.datamoshtechnologies.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    server_name api.jdm.datamoshtechnologies.com;

    location /media/ {
        alias /path/to/jdm_backend/jdm_backend/media/;
    }

    location /static/ {
        alias /path/to/jdm_backend/jdm_backend/staticfiles/;
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

Then issue SSL certs (Let's Encrypt):

```bash
sudo certbot --nginx -d jdm.datamoshtechnologies.com -d www.jdm.datamoshtechnologies.com -d api.jdm.datamoshtechnologies.com
```

## 7) Quick verification

- Frontend: `https://jdm.datamoshtechnologies.com`
- API test: `https://api.jdm.datamoshtechnologies.com/api/v1/home/`
- Media test: `https://api.jdm.datamoshtechnologies.com/media/...`

If API works but images fail, fix Nginx `alias` paths first.
