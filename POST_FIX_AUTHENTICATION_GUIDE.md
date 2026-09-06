# MediOrchestrator API - Authentication & Testing Guide

## 🔧 What Was Fixed

1. **Uncommented AuthController** - Now you can login and get JWT tokens
2. **Added CORS Support** - Allows Swagger UI to communicate with your API
3. **Improved JWT Bearer Configuration** - Better token extraction from Authorization header
4. **Added Event Handler** - Properly parses Bearer token from HTTP headers

---

## 🔐 Authentication Flow

### Step 1: Create a User (If Needed)

First, you need to create a user account in your database or use an existing one.

**Endpoint:** `POST /api/user/staff`
```json
{
  "email": "test@example.com",
  "fullName": "Test User",
  "password": "SecurePassword123!",
  "roleName": "Admin"
}
```

### Step 2: Login to Get JWT Token

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "SecurePassword123!"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresOn": "2026-09-04T07:13:58.123456Z",
  "user": {
	"id": 1,
	"email": "test@example.com",
	"fullName": "Test User",
	"roleName": "Admin"
  }
}
```

**Copy the `token` value** - you'll need this for the next step.

---

## 🧪 Testing with Swagger

### Method 1: Using Swagger UI Authorize Button (Recommended)

1. **Navigate to Swagger UI:** 
   - Open your browser and go to: `https://localhost:5001/swagger/ui/index.html` or similar

2. **Click the "Authorize" button** (🔒 lock icon at the top right)

3. **In the Authorization dialog:**
   - **Paste your token** in the text field exactly as received (without adding "Bearer" prefix)
   - The format should be the full JWT token string
   - Click **"Authorize"**

4. **Test endpoints:**
   - Now try `GET /api/user/staff/{id}`
   - Enter an ID (e.g., `1`) in the `id` parameter field
   - Click **"Try it out"** → **"Execute"**
   - You should now get a **200 OK** response instead of 401

### Method 2: Using cURL or Postman

```bash
curl -X GET "https://localhost:5001/api/user/staff/1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

---

## 📋 Complete API Endpoint Reference

### Authentication Endpoints
- **POST `/api/auth/login`** - Login and get JWT token

### User Management Endpoints (All Require Authentication)
- **GET `/api/user/staff`** - Get all users (Admin only)
- **GET `/api/user/staff/{id}`** - Get user by ID
- **POST `/api/user/staff`** - Create new user
- **PUT `/api/user/staff/{id}`** - Update user
- **DELETE `/api/user/staff/{id}`** - Delete user

---

## ❌ Troubleshooting

### Issue: Still Getting 401 Unauthorized

**Causes & Solutions:**

1. **Token is expired**
   - Get a new token by logging in again
   - Default expiration is 60 minutes

2. **Token format is invalid**
   - Make sure you copied the entire token from the login response
   - Don't include "Bearer" in Swagger's Authorize dialog (it's added automatically)
   - In cURL, use `Authorization: Bearer <token>`

3. **JWT configuration mismatch**
   - Verify `appsettings.json` has:
	 ```json
	 "Jwt": {
	   "Key": "your-super-secret-key-must-be-at-least-32-characters-long-for-security",
	   "Issuer": "MediOrchestratorAPI",
	   "Audience": "MediOrchestratorClients",
	   "ExpirationMinutes": 60
	 }
	 ```

4. **Clock skew**
   - If server and client clocks are very different, tokens may be rejected
   - Verify system time is correct

### Issue: Parameter Error - "id: Required field is not provided"

**Solutions:**

1. **Make sure you're authenticated first** - Token validation happens before parameter validation
2. **Provide the ID in the URL path** - e.g., `/api/user/staff/1`
3. **Ensure ID is an integer** - e.g., `1`, not `"1"`
4. **Check the route is correct** - Should be `/api/user/staff/{id}`

### Issue: 405 Method Not Allowed

- Make sure you're using the correct HTTP method (GET, POST, PUT, DELETE)
- Check the endpoint URL is exactly correct

---

## 🔑 JWT Token Structure

Your JWT tokens contain these claims:
- **NameIdentifier** - User ID
- **Email** - User email
- **Name** - User full name
- **Role** - User role (Admin, Doctor, Nurse, Patient, etc.)
- **iss** (Issuer) - "MediOrchestratorAPI"
- **aud** (Audience) - "MediOrchestratorClients"
- **exp** (Expiration) - Token expiration time

---

## 📝 Environment Configuration

The API requires these settings in `appsettings.json`:

```json
{
  "ConnectionStrings": {
	"DbConnection": "Server=localhost;Database=MediOrchestratorDB;User Id=postgres;Password=..."
  },
  "Jwt": {
	"Key": "your-super-secret-key-must-be-at-least-32-characters-long-for-security",
	"Issuer": "MediOrchestratorAPI",
	"Audience": "MediOrchestratorClients",
	"ExpirationMinutes": 60
  }
}
```

---

## ✅ Next Steps

1. ✅ Restart your API server
2. ✅ Try the login endpoint first to get a token
3. ✅ Use that token in Swagger's Authorize dialog
4. ✅ Test the GET/PUT endpoints with the ID parameter
5. ✅ All should return 200 OK instead of 401

---

## 💡 More Information

- [JWT Documentation](https://jwt.io/)
- [ASP.NET Core Authentication](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/)
- [Bearer Token Scheme](https://tools.ietf.org/html/rfc6750)
