# User Controller API Endpoints - Complete Documentation

## Overview
Fixed the UserController to include all 3 API endpoints with proper input/output handling.

---

## API Endpoints

### 1️⃣ CREATE USER
**Endpoint**: `POST /api/User/staff`

**Purpose**: Create a new user account

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "mobileNo": "1234567890",
  "roleName": "Admin"
}
```

**Request Headers**:
```
Content-Type: application/json
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobileNo": "1234567890",
  "roleId": "a5c8d7f1-2b3a-55c4-9e7f-8c2d9b1a3f5e",
  "roleName": "Admin",
  "isActive": true,
  "createdOn": "2026-09-03T14:30:00.0000000Z"
}
```

**Error Responses**:
- **400 Bad Request** - Email already exists or validation error
- **500 Internal Server Error** - Database error

**Validation Rules**:
- ✅ fullName: Required, max 100 characters
- ✅ email: Required, must be valid email
- ✅ password: Required, non-empty
- ✅ mobileNo: Required, must be valid phone number
- ✅ roleName: Required

---

### 2️⃣ GET ALL USERS
**Endpoint**: `GET /api/User/staff`

**Purpose**: Retrieve all users

**Request**: No body required
```
GET /api/User/staff HTTP/1.1
Host: localhost:7230
```

**Success Response (200 OK)**:
```json
[
  {
	"id": 1,
	"fullName": "John Doe",
	"email": "john@example.com",
	"mobileNo": "1234567890",
	"roleId": "a5c8d7f1-2b3a-55c4-9e7f-8c2d9b1a3f5e",
	"roleName": "Admin",
	"isActive": true,
	"createdOn": "2026-09-03T14:30:00.0000000Z"
  },
  {
	"id": 2,
	"fullName": "Jane Smith",
	"email": "jane@example.com",
	"mobileNo": "0987654321",
	"roleId": "b6d9e8g2-3c4b-66d5-0f8g-9d3e0c2b4g6f",
	"roleName": "Doctor",
	"isActive": true,
	"createdOn": "2026-09-03T15:00:00.0000000Z"
  }
]
```

**Empty Response** (if no users):
```json
[]
```

**Error Response**:
- **500 Internal Server Error** - Database error

---

### 3️⃣ UPDATE USER
**Endpoint**: `PUT /api/User/staff/{id}`

**Purpose**: Update an existing user

**Path Parameters**:
- `id` (integer, required) - User ID to update

**Request Body**:
```json
{
  "fullName": "John Updated",
  "email": "john.updated@example.com",
  "mobileNo": "9876543210",
  "roleName": "Doctor"
}
```

**Request Headers**:
```
Content-Type: application/json
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "fullName": "John Updated",
  "email": "john.updated@example.com",
  "mobileNo": "9876543210",
  "roleId": "b6d9e8g2-3c4b-66d5-0f8g-9d3e0c2b4g6f",
  "roleName": "Doctor",
  "isActive": true,
  "createdOn": "2026-09-03T14:30:00.0000000Z"
}
```

**Error Responses**:
- **404 Not Found** - User with given ID doesn't exist
- **400 Bad Request** - Email already in use or validation error
- **500 Internal Server Error** - Database error

**Validation Rules** (same as Create):
- ✅ fullName: Required, max 100 characters
- ✅ email: Required, must be valid email
- ✅ mobileNo: Required, must be valid phone number
- ✅ roleName: Required
- ⚠️ Note: Password cannot be updated via this endpoint (use separate password change endpoint)

---

## Testing with Swagger

Access Swagger UI at: **`https://localhost:7230/swagger`** or **`https://localhost:7230/`**

All three endpoints should now be visible:
```
POST   /api/User/staff          (Create User)
GET    /api/User/staff          (Get All Users)
PUT    /api/User/staff/{id}     (Update User)
```

---

## cURL Examples

### Create User
```bash
curl -X POST "https://localhost:7230/api/User/staff" \
  -H "Content-Type: application/json" \
  -d '{
	"fullName": "John Doe",
	"email": "john@example.com",
	"password": "SecurePassword123",
	"mobileNo": "1234567890",
	"roleName": "Admin"
  }'
```

### Get All Users
```bash
curl -X GET "https://localhost:7230/api/User/staff"
```

### Update User
```bash
curl -X PUT "https://localhost:7230/api/User/staff/1" \
  -H "Content-Type: application/json" \
  -d '{
	"fullName": "John Updated",
	"email": "john.updated@example.com",
	"mobileNo": "9876543210",
	"roleName": "Doctor"
  }'
```

---

## PowerShell Examples

### Create User
```powershell
$body = @{
	fullName = "John Doe"
	email = "john@example.com"
	password = "SecurePassword123"
	mobileNo = "1234567890"
	roleName = "Admin"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://localhost:7230/api/User/staff" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### Get All Users
```powershell
Invoke-WebRequest -Uri "https://localhost:7230/api/User/staff" `
  -Method GET
```

### Update User
```powershell
$body = @{
	fullName = "John Updated"
	email = "john.updated@example.com"
	mobileNo = "9876543210"
	roleName = "Doctor"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://localhost:7230/api/User/staff/1" `
  -Method PUT `
  -ContentType "application/json" `
  -Body $body
```

---

## Changes Made to UserController.cs

### ✅ Fixed Issues
1. **CreateUser() endpoint** - Added with proper request body handling
   - Accepts `[FromBody]` CreateUserRequestDTO
   - Returns created user with all fields populated
   - Handles validation errors (400 Bad Request)

2. **GetAllUsers() endpoint** - Fixed to return data
   - Now returns the list of users from service
   - Was previously not returning the result

3. **UpdateUser() endpoint** - Added complete implementation
   - Accepts user ID as route parameter
   - Accepts `[FromBody]` UpdateUserRequestDTO
   - Returns 404 if user not found
   - Returns 400 if email already in use
   - Returns updated user details

4. **Error Handling** - Added try-catch blocks
   - InvalidOperationException → 400 Bad Request
   - KeyNotFoundException → 404 Not Found
   - General Exception → 500 Internal Server Error

---

## Before vs After

### ❌ Before
```
Only 1 endpoint visible:
- GET /api/User/staff  (doesn't return data)

Other 2 endpoints: MISSING
- POST /api/User/staff (create user) - NOT VISIBLE
- PUT /api/User/staff/{id} (update user) - NOT VISIBLE
```

### ✅ After
```
All 3 endpoints visible:
- POST /api/User/staff          → Create a new user
- GET /api/User/staff           → Get all users  
- PUT /api/User/staff/{id}      → Update an existing user

All endpoints:
✅ Accept proper inputs
✅ Return proper outputs
✅ Handle errors gracefully
```

---

## Next Steps

1. **Rebuild** your solution
2. **Run** the application
3. **Open Swagger** at `https://localhost:7230/swagger`
4. **Test all 3 endpoints** using the Swagger UI
5. **Verify data** in pgAdmin after creating/updating users

---

## File Modified
- `Controllers/UserController.cs` - Complete rewrite with all 3 endpoints

✅ Ready to test! 🚀
