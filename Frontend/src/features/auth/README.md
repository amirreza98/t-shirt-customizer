# Authentication Feature

## Implemented Files (Active - Do Not Delete)

### Core Files
- `api.ts` - API functions for authentication (login, register, logout, getMe)
- `store.ts` - Valtio state management for auth with loading/error states
- `hooks/use-auth.ts` - Main authentication hook used throughout the app
- `auth.test.ts` - Basic integration tests for auth functionality

### UI Components
- `ui/protected-route.tsx` - Route protection component for authenticated routes
- `NotFound.jsx` - 404 page component

## Deprecated Files (Can Be Removed)

These files are no longer used and can be safely deleted:

- `ui/login-form.tsx` - Old login form component (replaced by `/pages/Login.jsx`)
- `login.tsx` - Empty placeholder file
- `/app/providers/auth-provider.ts` - Old auth provider (replaced by Valtio store)

## Usage

### Using Authentication Hook

```typescript
import { useAuth } from '@/features/auth/hooks/use-auth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, login, logout, register } = useAuth();

  // Check if user is logged in
  if (isAuthenticated) {
    return <div>Welcome, {user.name}!</div>;
  }

  // Login
  const handleLogin = async () => {
    try {
      await login({ email: 'test@example.com', password: 'password123' });
    } catch (error) {
      // Error is automatically set in auth state
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### Protecting Routes

```typescript
import { ProtectedRoute } from '@/features/auth/ui/protected-route';

<Route
  path="/customizer"
  element={
    <ProtectedRoute>
      <CustomizerPage />
    </ProtectedRoute>
  }
/>
```

## Features

### Backend (Completed)
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Protected routes with middleware
- ✅ Logout functionality
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ Error handling

### Frontend (Completed)
- ✅ Login page with validation
- ✅ Register page with validation
- ✅ Protected routes
- ✅ Valtio state management
- ✅ Loading and error states
- ✅ Integration with backend API
- ✅ Automatic authentication check on app load
- ✅ User-friendly error messages

## State Management

The auth state is managed using Valtio and includes:

```typescript
{
  user: User | null,           // Current logged-in user
  isAuthenticated: boolean,    // Authentication status
  isLoading: boolean,          // Loading state
  error: string | null        // Error message
}
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user
