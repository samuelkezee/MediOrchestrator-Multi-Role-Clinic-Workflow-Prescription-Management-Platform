# Database Persistence Issue - Troubleshooting Guide

## Problem
✗ API returns successful response with ID  
✗ Data NOT appearing in PostgreSQL table  

## Root Cause Analysis

### Connection String Details Found:
```
Server=localhost
Database=MediOrchestratorDB
User=postgres
Password=k@EW8ybK
```

---

## Troubleshooting Checklist

### STEP 1: Verify Database Connection
Run this in pgAdmin to test the connection:

```sql
SELECT * FROM user_account;
```

**Expected**: Empty table (no records)  
**If you see records**: Then SaveChangesAsync IS working, and the issue is elsewhere

---

### STEP 2: Check if Migrations Were Applied

Run in Package Manager Console:
```powershell
Get-Migration
```

**Look for:**
- ✅ `20260901112552_InitialCreate`
- ✅ `20260903105350_UpdateModelChanges`

If migrations show but table doesn't exist, run:
```powershell
Update-Database
```

---

### STEP 3: Verify Table Exists in pgAdmin

1. Open pgAdmin
2. Navigate to: **Databases** → **MediOrchestratorDB** → **Schemas** → **public** → **Tables**
3. Look for: **user_account** table

**If table is missing**: Migrations were NOT applied to the database

---

### STEP 4: Check for Errors During SaveChangesAsync

The UserService should throw exceptions if SaveChangesAsync fails. If you're not seeing errors, add logging:

---

## Most Likely Causes (in order of probability)

### 🔴 **Issue 1: Migrations Not Applied (MOST LIKELY)**
**Symptom**: API responds successfully but pgAdmin shows no table  
**Fix**: 
```powershell
Update-Database
```

---

### 🔴 **Issue 2: Wrong Database Server**
**Symptom**: Table exists but different database is being updated  
**Check**:
- Is Server actually `localhost`? (Not 127.0.0.1?)
- Is the Password correct?
- Is PostgreSQL running?

**Test connection**:
```powershell
# In Package Manager Console
$connString = "Server=localhost;Database=MediOrchestratorDB;User Id=postgres;Password=k@EW8ybK"
Write-Host $connString
```

---

### 🔴 **Issue 3: DbContext Not Injected Properly**
**Symptom**: Different DbContext instance being used  
**Check in Program.cs**:
```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnection")));
```

✅ This exists and looks correct

---

### 🔴 **Issue 4: SaveChangesAsync Exception Silently Caught**
**Symptom**: Exception thrown but not returned to client  
**Current code** of UserService CreateUserAsync:
```csharp
await _context.SaveChangesAsync(); // If this throws, needs to be caught and logged
```

---

## Diagnostic Steps to Run NOW

### Step A: Verify PostgreSQL is Running
```powershell
# Check if PostgreSQL service is running
Get-Service | Where-Object {$_.Name -like "*postgres*"}
```

### Step B: Test Database Connection
```powershell
# In Package Manager Console
Add-Migration TestConnection -Verbose
```

Check output for connection errors.

### Step C: Check EF Core Logs
Add this to Program.cs temporarily to see SQL queries:

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnection"))
		   .LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information)); // Add this line
```

Then recreate the user and watch console output.

### Step D: Manual Database Query
In pgAdmin, run:
```sql
-- Check if table exists
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'user_account';

-- Check table structure
\d user_account;

-- Check for any data
SELECT COUNT(*) FROM user_account;
```

---

## Quick Fix Workflow

### If table doesn't exist:
```powershell
# Open Package Manager Console
Update-Database -Verbose
```

Then test API again.

### If table exists but data not saving:
```powershell
# Check connection string is correct
Update-Database -Verbose
```

If still fails, check for SQL errors in output.

### If data saves but pgAdmin doesn't show it:
```powershell
# Close and reopen pgAdmin
# OR right-click table → Refresh
```

---

## Expected Behavior After Fix

### POST to: `https://localhost:7230/api/User/staff`
```json
{
  "fullName": "sami",
  "email": "samuel@gmail.com",
  "password": "password123",
  "mobileNo": "9074003923",
  "roleName": "Admin"
}
```

### Response:
```json
{
  "id": 2,
  "fullName": "sami",
  "email": "samuel@gmail.com",
  "mobileNo": "9074003923",
  "roleId": "",
  "roleName": "Admin",
  "isActive": true,
  "createdOn": "2026-09-03T13:03:06.3058854Z"
}
```

### In pgAdmin (user_account table):
| id | fullname | email | mobileNo | roleName | passwordHash | isActive | createdOn |
|----|----------|-------|----------|----------|--------------|----------|-----------|
| 2 | sami | samuel@gmail.com | 9074003923 | Admin | [hashed] | true | 2026-09-03 |

✅ Record should appear immediately

---

## Additional Issues Found

### 🟡 Empty RoleId
After user creation, `roleId` is empty string. This might be intended, but verify:
- Should RoleId be populated from RoleName?
- Or is RoleId set later?

### 🟡 Method Naming
`GetAllUsers` method actually creates a user (should be `CreateUser`)

---

## Next Steps

1. **Run `Update-Database` from Package Manager Console**
2. **Verify table exists in pgAdmin**
3. **Try API call again and check if data appears**
4. **If still not working**, enable EF Core logging (see Step C above)
5. **Check browser console** for any network errors

---

**Let me know the result of `Update-Database` and I can provide more specific fixes!**
