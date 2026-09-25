# PrestaControl

Web application for managing clients, loans, payments, and weekly collections from a centralized interface.

PrestaControl combines a frontend built with React and Vite with a REST API developed in FastAPI. It includes JWT authentication, password recovery via email, and loan history tracking for each client.

## Features

- User registration and login.
- JWT-based authentication.
- Password recovery and change.
- Email change and access preferences.
- Client management.
- Loan creation and editing.
- Real loan history per client.
- View active and completed loans.
- Payment tracking and recording.
- Weekly collections view.
- General portfolio statistics.
- Responsive design for desktop and mobile devices.

## Technologies

### Frontend
- React 19
- React Router
- Vite
- TypeScript
- Tailwind CSS 4

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT with python-jose
- Passlib and bcrypt
- FastAPI Mail

## Main structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── clients/
│   │   ├── dashboard/
│   │   ├── home/
│   │   ├── login/
│   │   ├── register/
│   │   ├── ui/
│   │   └── weeklyPayments/
│   ├── pages/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
└── package.json

backend/
├── app/
│   ├── api/
│   │   └── routers/
│   ├── core/
│   ├── db/
│   ├── schemas/
│   └── services/
├── main.py
└── requirements.txt
```

## Requirements

- Node.js 22 or higher
- pnpm 10 or higher
- Python 3.11 or higher
- PostgreSQL

## Frontend installation

From the frontend folder:

```bash
pnpm install
pnpm run dev
```

The application will typically be available at:

```
http://localhost:5173
```

To generate a production build:

```bash
pnpm run build
```

## Backend installation

From the backend folder, create and activate a virtual environment.

### Windows
```bash
python -m venv vloans
.\vloans\Scripts\Activate.ps1
pip install -r requirements.txt
```

### macOS or Linux
```bash
python -m venv vloans
source vloans/bin/activate
pip install -r requirements.txt
```

Start the API:

```bash
uvicorn main:app --reload
```

The API will be available at:

```
http://127.0.0.1:8000
```

The interactive FastAPI documentation can be found at:

```
http://127.0.0.1:8000/docs
```

## Environment variables

Create a `.env` file at the root of the backend. Do not publish this file or use real credentials in the repository.

```
DATABASE_URL=postgresql://user:password@localhost/database_name

SECRET_KEY=generate_a_random_and_secure_key
ALGORITHM=HS256
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES=30

MAIL_USERNAME=email@gmail.com
MAIL_PASSWORD=google_app_password
MAIL_FROM=email@gmail.com
MAIL_FROM_NAME=PrestaControl
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_STARTTLS=true
MAIL_SSL_TLS=false

FRONTEND_URL=http://localhost:5173
```

You can generate a secure key for `SECRET_KEY` with:

```bash
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

For Gmail, you must use an app password, not the regular account password.

## Main endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/token` | Log in |
| POST | `/user/` | Register a user |
| GET | `/user/` | Get the authenticated profile |
| PUT | `/user/password` | Change the authenticated password |
| POST | `/user/forgot-password` | Request password recovery |
| POST | `/user/reset-password` | Save a new password via token |
| GET | `/client/` | Get clients with loans and payments |
| POST | `/client` | Create a client |
| GET | `/loans` | Get loans |
| POST | `/loans/` | Create a loan |
| GET | `/loans/stats` | Get statistics |
| GET | `/payments/week` | Get weekly collections |

Protected endpoints require:

```
Authorization: Bearer <access_token>
```

## Password recovery

1. The user selects "Forgot your password?" on the login screen.
2. The frontend sends the email to `POST /user/forgot-password`.
3. The backend generates a temporary token and sends a link via email.
4. The link points to:
   ```
   /reset-password?token=<token>
   ```
5. The frontend sends the token and new password to `POST /user/reset-password`.
6. The backend validates the token, updates the password, and invalidates it upon expiration.

## Security

- Do not publish `.env` files.
- Do not store passwords in plain text.
- Use bcrypt to store passwords.
- Use app passwords for SMTP services.
- Immediately rotate any exposed credentials.
- Configure CORS only with authorized domains in production.
- Use HTTPS in production.
- Change `FRONTEND_URL` to the public address before deploying.

A minimal `.gitignore` should include:

```
.env
.env.*
!.env.example
node_modules/
dist/
__pycache__/
*.py[cod]
vloans/
```

## Project status

The project is under active development. Before deploying to production, it is recommended to:

- Configure a domain and HTTPS.
- Use a transactional email provider.
- Add automated tests.
- Configure database migrations.
- Centralize the API URL via frontend environment variables.
- Limit login and password recovery attempts.
