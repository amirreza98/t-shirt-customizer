# Integrated Authentication with Home Page

## Overview

The authentication system is now fully integrated into the Home page with a modal popup for login/register. Users no longer need to navigate to separate pages for authentication.

## User Flow

### 1. Landing Page (`/`)
- Users see the beautiful 3D t-shirt canvas with the Home landing section
- "Get Started" button is displayed for non-authenticated users
- If already logged in, shows "Welcome back, [Name]!" with "Start Customizing" button

### 2. Authentication Modal
When a non-authenticated user clicks "Get Started":
- A modal popup appears with login form
- Users can toggle between Login and Register modes
- All validation happens in real-time
- After successful auth, modal closes and redirects to `/customizer`

### 3. Customizer Page (`/customizer`)
- Protected route - requires authentication
- Full 3D customization tools
- Includes Home, Canvas, and Customizer components

## Files Structure

### New Files
- `Frontend/src/features/auth/ui/auth-modal.tsx` - Modal component with login/register

### Updated Files
- `Frontend/src/pages/Home.jsx` - Now includes auth modal integration
- `Frontend/src/app/App.tsx` - Simplified routes, Home is now landing page

### Routes

| Path | Description | Auth Required |
|------|-------------|---------------|
| `/` | Home page with 3D canvas | No |
| `/customizer` | Full customization tools | Yes |
| `/login` | Redirects to `/` | - |
| `/register` | Redirects to `/` | - |

## Features

### Auth Modal Features
- ✅ Toggle between Login and Register
- ✅ Real-time form validation
- ✅ Client-side validation (email format, password strength)
- ✅ Server-side validation
- ✅ Loading states with disabled inputs
- ✅ Error display with animations
- ✅ Smooth animations with Framer Motion
- ✅ Click outside to close
- ✅ Close button (×)
- ✅ Auto-redirect to customizer after successful auth

### Home Page Features
- ✅ Shows different content for authenticated vs non-authenticated users
- ✅ Personalized welcome message for logged-in users
- ✅ 3D canvas always visible in background
- ✅ Smooth modal transitions

## Usage Example

### For Non-Authenticated Users
1. Visit http://localhost:5173
2. See "Get Started" button
3. Click button → Auth modal appears
4. Fill in login or register form
5. Submit → Redirected to `/customizer`

### For Authenticated Users
1. Visit http://localhost:5173
2. See "Welcome back, [Name]!"
3. Click "Start Customizing"
4. Go directly to `/customizer`

## Validation Rules

### Login
- Email: Valid format (user@domain.com)
- Password: Required

### Register
- Name: Minimum 2 characters
- Email: Valid format, unique
- Password:
  - Minimum 8 characters
  - At least 1 letter
  - At least 1 number

## Tech Stack
- React with TypeScript
- Valtio for state management
- Framer Motion for animations
- React Router for routing
- Tailwind CSS for styling

## Testing

To test the authentication flow:

1. Start the backend: `cd backend && npm start`
2. Start the frontend: `cd Frontend && npm run dev`
3. Visit http://localhost:5173
4. Click "Get Started"
5. Try registering a new account
6. Test login with the created account
7. Verify redirect to `/customizer`

## API Endpoints Used

- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

## Benefits of This Approach

1. **Better UX** - No page navigation for authentication
2. **Modern Design** - Modal overlay with smooth animations
3. **Less Friction** - Users stay on the main page
4. **Cleaner URLs** - No separate /login or /register pages needed
5. **Mobile Friendly** - Modal adapts to screen size
6. **SEO Friendly** - Single landing page for better indexing
