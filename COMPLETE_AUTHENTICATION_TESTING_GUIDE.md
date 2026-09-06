# 🔐 Complete Authentication & Testing Guide - UPDATED

## ✅ What Was Just Fixed

1. **CORS Configuration** - Now explicitly allows Authorization header in cross-origin requests
2. **Middleware Order** - CORS is applied BEFORE authentication for proper preflight handling
3. **Exposed Headers** - Authorization header is now properly exposed in responses

---

## 🔑 Step 1: Get Your Token (Login)

### Option A: Using Swagger UI (Easiest)

1. Open Swagger: `https://localhost:7230/swagger/ui/index.html`
2. Find the **POST /api/Auth/login** endpoint
3. Click **"Try it out"**
4. Enter your credentials:
```json
{
  "email": "your-email@example.com",
  "password": "your-password"
}
```
5. Click **"Execute"**
6. **Copy the token** from the response body (not including the quotes)

### Option B: Using cURL

```powershell
$loginResponse = curl -X POST "https://localhost:7230/api/Auth/login" `
  -H "Content-Type: application/json" `
  -d '{
	"email": "your-email@example.com",
	"password": "your-password"
  }' -SkipCertificateCheck

# The response will contain: {"token":"eyJhbGc...", "expiresOn":"...", "user":{...}}
```

---

## 🧪 Step 2: Test GET with Authorization Header

### Option A: Using cURL (PowerShell)

```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # Your token from login

curl -X GET "https://localhost:7230/api/User/staff/1" `
  -H "Authorization: Bearer $token" `
  -H "Content-Type: application/json" `
  -SkipCertificateCheck
```

### Option B: Using cURL (Bash/Git Bash)

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # Your token from login

curl -X GET "https://localhost:7230/api/User/staff/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -k  # Skip SSL certificate verification
```

### Option C: Using Swagger UI

1. You should now see an **Authorize 🔒** button at the top of Swagger
2. Click it
3. In the **Authorization** field, paste ONLY the token (without "Bearer")
4. Click **"Authorize"**
5. Click **"Close"**
6. Now try any endpoint - the token will be automatically included!

---

## 📋 Important: Authorization Header Format

**CORRECT:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**INCORRECT (missing space):**
```
Authorization: BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**INCORRECT (missing prefix):**
```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎯 All Endpoints & Their Requirements

### Public Endpoints (NO Token Required)
- **POST `/api/Auth/login`** - Login with email & password

### Protected Endpoints (Token REQUIRED)
- **GET `/api/User/staff`** - Get all users (Admin role required)
- **GET `/api/User/staff/{id}`** - Get user by ID
- **POST `/api/User/staff`** - Create new user
- **PUT `/api/User/staff/{id}`** - Update user
- **DELETE `/api/User/staff/{id}`** - Delete user

**Example with token:**
```bash
curl -X PUT "https://localhost:7230/api/User/staff/1" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"new@example.com","fullName":"Updated Name","roleName":"Doctor"}' \
  -k
```

---

## ❌ Troubleshooting 401 Errors

### Problem: Still getting 401 Unauthorized

**Checklist:**
1. ✅ Do you have a valid token from the login endpoint?
2. ✅ Is your Authorization header formatted correctly? (i.e., `Bearer <token>`)
3. ✅ Is your token expired? (Default expiration: 60 minutes)
   - Solution: Login again to get a fresh token
4. ✅ Do your credentials (email/password) match a user in the database?
   - Create a user first if needed
5. ✅ Check that JWT configuration in `appsettings.json` is correct:
   ```json
   "Jwt": {
	 "Key": "your-super-secret-key-must-be-at-least-32-characters-long-for-security",
	 "Issuer": "MediOrchestratorAPI",
	 "Audience": "MediOrchestratorClients",
	 "ExpirationMinutes": 60
   }
   ```

### Problem: CORS error or "Origin not allowed"

**Solution:**
API now accepts requests from any origin. If you still see CORS errors:
- Clear browser cache
- Try from a different browser or Incognito mode
- Restart the API server

### Problem: 404 - Endpoint not found

**Check:**
- URL must include capital "U" in "User": `/api/User/staff`
- Not `/api/user/staff` (lowercase won't work)
- Full path example: `https://localhost:7230/api/User/staff/1`

### Problem: Token appears valid but still 401

**Debug steps:**
1. Restart your API server
2. Clear all browser cookies and cache
3. Get a fresh token by logging in again
4. Use that new token immediately

---

## 🔍 Understanding JWT Tokens

Your token contains:
- **User ID** - Identifies which user this token is for
- **Email** - User's email address
- **Full Name** - User's full name
- **Role** - User's role (Admin, Doctor, Nurse, Patient, etc.)
- **Expiration** - When this token stops being valid
- **Signature** - Cryptographic proof it hasn't been tampered with

Once a token expires, you need to login again to get a new one.

---

## 🚀 Quick Start Example

### 1. Login to Get Token

```powershell
$loginResponse = curl -X POST "https://localhost:7230/api/Auth/login" `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"TestPass123!"}' `
  -SkipCertificateCheck

Write-Host $loginResponse
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresOn": "2026-09-04T08:30:00Z",
  "user": {"id": 1, "email": "test@example.com"}
}
```

### 2. Copy the Token and Use It

```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET "https://localhost:7230/api/User/staff/1" `
  -H "Authorization: Bearer $token" `
  -SkipCertificateCheck
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "test@example.com",
  "fullName": "Test User",
  "roleName": "Admin"
}
```

---

## 📞 Still Having Issues?

Try these commands to verify your API is running:

```powershell
# Check if API is running
curl -X GET "https://localhost:7230/openapi/v1.json" -SkipCertificateCheck

# Try health check (if you have one)
curl -X GET "https://localhost:7230/health" -SkipCertificateCheck
```

If the API responds, it's running. If you get connection refused, the API isn't listening on that port/host.

---

## ✅ Build Status

✅ **All changes compiled successfully**

**Next Steps:**
1. Restart your API server
2. Follow the steps above to login and get a token
3. Test endpoints with the Authorization header included
4. Should now get 200 OK responses instead of 401!
