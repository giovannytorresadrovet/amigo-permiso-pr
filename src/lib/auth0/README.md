
# Auth0 Integration Setup

This directory contains all the necessary components for Auth0 integration in your React application.

## Quick Start

### 1. Environment Variables

Create the following environment variables:

```bash
VITE_AUTH0_ENABLED=true
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-audience (optional)
```

### 2. Auth0 Dashboard Configuration

In your Auth0 dashboard:

1. **Allowed Callback URLs**: `http://localhost:5173, https://yourdomain.com`
2. **Allowed Logout URLs**: `http://localhost:5173, https://yourdomain.com`
3. **Allowed Web Origins**: `http://localhost:5173, https://yourdomain.com`

### 3. Enable Auth0

Set `VITE_AUTH0_ENABLED=true` in your environment variables to switch from mock authentication to Auth0.

## Features

- **Seamless Integration**: Switch between mock and Auth0 authentication with a single environment variable
- **Security**: Integrated with the existing security layer including rate limiting and audit logging
- **Type Safety**: Full TypeScript support with proper type definitions
- **Error Handling**: Comprehensive error handling and loading states
- **Customizable**: Easy to customize and extend

## Components

- `AuthProvider`: Main authentication provider with fallback to mock authentication
- `AuthGuard`: Protects routes and components that require authentication
- `Auth0LoginButton`: Ready-to-use Auth0 login button
- `Auth0SignupButton`: Ready-to-use Auth0 signup button
- `AuthModeToggle`: Shows current authentication mode (mock vs Auth0)

## Usage

```tsx
import { useAuth } from '@/lib/auth0';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <button onClick={() => login()}>Login</button>;
  }
  
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};
```

## Migration Path

1. **Phase 1**: Current setup with mock authentication (already implemented)
2. **Phase 2**: Configure Auth0 and set environment variables
3. **Phase 3**: Enable Auth0 by setting `VITE_AUTH0_ENABLED=true`
4. **Phase 4**: Customize Auth0 integration as needed

## Security Integration

The Auth0 integration includes:
- Rate limiting for authentication actions
- Audit logging for all authentication events
- Input sanitization for user data
- CSRF protection and secure headers
