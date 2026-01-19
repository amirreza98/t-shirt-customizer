# Authentication Setup Guide

This guide explains how to set up and run the authentication feature in the T-Shirt Customizer application.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (or Supabase account)
- Backend and Frontend dependencies installed

## Setup Steps

### 1. Database Setup

Run the migration to create the users table:

```bash
# Option 1: Using psql
cd backend
psql $DATABASE_URL -f migrations/001_create_users_table.sql

# Option 2: Using Supabase SQL Editor
# Copy the contents of backend/migrations/001_create_users_table.sql
# and run it in the Supabase SQL Editor
```

### 2. Environment Variables

#### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# JWT Secret (use a strong random string)
JWT_SECRET=your_very_secure_random_secret_key

# Environment
NODE_ENV=development
```

#### Frontend (.env.local)

The frontend already has the necessary configuration. Verify these settings in `Frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5001
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../Frontend
npm install
```

### 4. Start the Application

```bash
# Terminal 1: Start Backend
cd backend
npm start
# Server runs on http://localhost:5001

# Terminal 2: Start Frontend
cd Frontend
npm run dev
# App runs on http://localhost:5173 (or your configured port)
```

## Testing the Authentication

### 1. Register a New User

1. Navigate to http://localhost:5173
2. Click "Register"
3. Fill in the form:
   - Name: At least 2 characters
   - Email: Valid email format
   - Password: Minimum 8 characters, must contain at least one letter and one number
4. Click "Register"
5. You'll be redirected to the home page, logged in

### 2. Login with Existing User

1. Navigate to http://localhost:5173
2. Click "Login"
3. Enter your email and password
4. Click "Login"
5. You'll be redirected to the home page

### 3. Access Protected Routes

1. While logged in, navigate to http://localhost:5173/customizer
2. You'll see the t-shirt customizer page
3. Try logging out and accessing /customizer again
4. You'll be redirected to the login page

## API Endpoints

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### POST /api/auth/login
Login an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### GET /api/auth/me
Get current logged-in user (requires authentication).

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### POST /api/auth/logout
Logout the current user.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

## Security Features

### Backend
- Password hashing using bcryptjs (10 salt rounds)
- JWT tokens with 30-day expiration
- HTTP-only, Secure, SameSite=Strict cookies
- Input validation and sanitization
- Email format validation
- Password complexity requirements
- Protected routes with authentication middleware

### Frontend
- Client-side form validation
- Secure cookie handling
- Protected routes that redirect to login
- Loading and error states
- Automatic authentication check on app load

## Validation Rules

### Name
- Minimum 2 characters
- Maximum 100 characters

### Email
- Valid email format (user@domain.com)
- Converted to lowercase
- Must be unique

### Password
- Minimum 8 characters
- Must contain at least one letter
- Must contain at least one number

## Troubleshooting

### "User already exists" Error
- Email addresses must be unique
- Try a different email or use the login page

### "Invalid credentials" Error
- Check that email and password are correct
- Passwords are case-sensitive

### Cannot Access Protected Routes
- Make sure you're logged in
- Check browser console for errors
- Verify backend is running on port 5001

### CORS Errors
- Ensure backend is running
- Check that `withCredentials` is set in axios
- Verify CORS configuration in backend/server.js

### Database Connection Issues
- Verify DATABASE_URL is correct in backend/.env
- Check that PostgreSQL/Supabase is running
- Ensure users table has been created with the migration

## File Structure

```
backend/
├── config/
│   └── DB.js                 # Database connection
├── middleware/
│   └── auth.js               # Authentication middleware
├── migrations/
│   ├── 001_create_users_table.sql
│   └── README.md
├── routes/
│   └── auth.js               # Authentication routes
├── utils/
│   └── validation.js         # Input validation utilities
└── server.js                 # Express server

Frontend/src/
├── features/auth/
│   ├── api.ts                # Auth API functions
│   ├── store.ts              # Valtio state management
│   ├── auth.test.ts          # Tests
│   ├── hooks/
│   │   └── use-auth.ts       # Auth hook
│   └── ui/
│       └── protected-route.tsx
├── pages/
│   ├── Login.jsx             # Login page
│   ├── Register.jsx          # Register page
│   └── LoginFirst.jsx        # Home page
└── app/
    └── App.tsx               # Main app with routes
```

## Next Steps

### Optional Enhancements
- Email verification
- Password reset functionality
- Refresh token implementation
- Two-factor authentication
- User profile management
- Remember me functionality
- Session management UI
- Account deletion

### Testing
- Run the basic tests: `cd Frontend && npm test`
- Add more comprehensive integration tests
- Test error scenarios
- Test protected routes

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the backend logs
3. Verify all environment variables are set
4. Ensure database migration has been run
5. Make sure both frontend and backend are running
