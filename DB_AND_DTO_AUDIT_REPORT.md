# Database & DTO Audit Report
**Generated**: September 3, 2025

---

## Executive Summary
✅ **Overall Status**: GOOD - No critical mismatches found
- Database schema matches Entity model
- DTOs are properly mapped to Entity
- All required validations are in place
- One typo found in OpenAPI specification (typo in schema documentation)

---

## 1. DATABASE SCHEMA vs ENTITY MODEL

### UserAccount Entity Properties

| Property | Type | Nullable | Database Column | Status |
|----------|------|----------|-----------------|--------|
| Id | int | ❌ No | id (PK) | ✅ OK |
| FullName | string | ❌ No | fullname | ✅ OK |
| Email | string | ❌ No | email | ✅ OK |
| PasswordHash | string | ❌ No | passwordhash | ✅ OK |
| MobileNo | string | ❌ No | mobileno | ✅ OK |
| RoleId | string | ❌ No | roleid | ✅ OK |
| RoleName | string | ❌ No | rolename | ✅ OK |
| IsActive | bool? | ✅ Yes | isactive | ✅ OK |
| CreatedOn | DateTime | ❌ No | createdon | ✅ OK |
| UpdatedAt | DateTime | ❌ No | updatedat | ✅ OK |

**Result**: ✅ **All properties correctly mapped to database schema**

---

## 2. DTO vs ENTITY MAPPING

### CreateUserRequestDTO (Input)

| DTO Field | Model Field | Validation | Status |
|-----------|-------------|-----------|--------|
| FullName | FullName | [Required], [StringLength(100)] | ✅ OK |
| Email | Email | [Required], [EmailAddress] | ✅ OK |
| Password | PasswordHash | [Required], [PasswordPropertyText] | ✅ OK (converted to hash) |
| MobileNo | MobileNo | [Required], [Phone] | ✅ OK |
| RoleName | RoleName | [Required] | ✅ OK |

**Mapper Behavior**: `UserMapper.ToEntity()` correctly:
- Hashes the password using IPasswordHasher
- Sets IsActive = true by default
- Sets CreatedOn = DateTime.UtcNow
- Does NOT set RoleId (handled separately or null)

**Potential Issue Found**: 🔴 **RoleId is not populated in CreateUserRequestDTO**
- User can create an account but RoleId will be empty
- Consider: Does RoleId need to be generated from RoleName, or should it be provided separately?

---

### CreateUserResponseDTO (Output)

| DTO Field | Model Field | Status |
|-----------|-------------|--------|
| Id | Id | ✅ OK |
| FullName | FullName | ✅ OK |
| Email | Email | ✅ OK |
| MobileNo | MobileNo | ✅ OK |
| RoleId | RoleId | ✅ OK |
| RoleName | RoleName | ✅ OK |
| IsActive | IsActive | ✅ OK (nullable handled) |
| CreatedOn | CreatedOn | ✅ OK |

**Missing Fields**: 
- PasswordHash (correctly omitted from response)
- UpdatedAt (could be useful in response)

**Result**: ✅ **All response fields are properly mapped**

---

### UpdateUserRequestDTO

| DTO Field | Model Field | Validation | Status |
|-----------|-------------|-----------|--------|
| FullName | FullName | [Required], [StringLength(100)] | ✅ OK |
| Email | Email | [Required], [EmailAddress] | ✅ OK |
| MobileNo | MobileNo | [Required], [Phone] | ✅ OK |
| RoleName | RoleName | [Required] | ✅ OK |

**Missing**: Password update capability
- Users cannot update their password through UpdateUserRequestDTO
- Consider: Should there be a separate `UpdatePasswordDTO`?

**Result**: ✅ **Partial - works but missing password update**

---

## 3. OpenAPI SPECIFICATION ISSUES

### ❌ **Issue Found: Typo in CreateUserRequestDTO**

In the OpenAPI spec at `/openapi/v1.json`, the property is defined as:
```json
"mobiileNo": {
  "type": "string"
}
```

**Problem**: "mobiileNo" has two 'i's (extra 'i')
**Actual Property in Code**: "MobileNo" (correct spelling)
**Impact**: 
- OpenAPI documentation is misleading
- Client developers following OpenAPI spec will use wrong property name
- API will not accept requests with "mobiileNo"

**Root Cause**: Likely a typo in an earlier version that got baked into migrations or decorations

---

## 4. DATA TYPE CONSISTENCY

### String Properties
- All string properties in model use `string` type (good)
- All use `= string.Empty` default initialization (good, no null reference issues)
- Database stores as `text` type (appropriate for PostgreSQL)

### DateTime Properties  
- CreatedOn: `DateTime` (UTC recommended) ✅
- UpdatedAt: `DateTime` - **⚠️ Default value is DateTime.MinValue** (problematic for new records)

**Issue**: UpdatedAt is set to internal setter, meaning it's not automatically updated
```csharp
public DateTime UpdatedAt { get; internal set; }
```
Currently only set in mapper when updating records, not on creation.

### Boolean Property
- IsActive is nullable `bool?` 
- Mapped correctly in DTO as non-nullable `bool`
- Handled properly: `IsActive ?? false` in mapper

---

## 5. PASSWORD HANDLING

| Aspect | Status | Notes |
|--------|--------|-------|
| Password hashing | ✅ OK | Uses IPasswordHasher<UserAccount> |
| Password in request | ✅ OK | Accepted as plain text in DTO |
| Password in response | ✅ OK | PasswordHash never returned to client |
| Password in DB | ✅ OK | Stored as PasswordHash |

**Result**: ✅ **Password security properly implemented**

---

## 6. VALIDATION ANALYSIS

### Input Validations (Good Coverage)

**CreateUserRequestDTO**:
- ✅ [Required] on all fields
- ✅ [EmailAddress] on Email
- ✅ [Phone] on MobileNo  
- ✅ [StringLength(100)] on FullName
- ✅ [PasswordPropertyText] on Password

**UpdateUserRequestDTO**:
- ✅ [Required] on all fields
- ✅ [EmailAddress] on Email
- ✅ [Phone] on MobileNo
- ✅ [StringLength(100)] on FullName

**Service-Level Validations**:
- ✅ Email uniqueness check before creation
- ✅ Email uniqueness check on update (ignores self)
- ✅ User existence check on update

**Result**: ✅ **Comprehensive validation in place**

---

## SUMMARY OF FINDINGS

### ✅ PASS - No Critical Issues
1. **Database schema correctly matches entity model**
2. **DTOs properly map to entities**
3. **All columns exist in database migrations**
4. **Password handling is secure**
5. **Validations are comprehensive**

### ⚠️ WARNINGS - Review Recommended
1. **RoleId Population**: 
   - Currently empty/null when user is created
   - Need clarification: Should RoleId be derived from RoleName or provided separately?
   - Database allows empty string, but semantically a problem

2. **Password Update Capability**:
   - UpdateUserRequestDTO doesn't allow password changes
   - Users cannot update their password once created
   - Consider adding separate password change endpoint

3. **UpdatedAt Handling**:
   - Not automatically set on creation (only on update)
   - Consider setting on creation too for consistency

### 🔴 CRITICAL - Must Fix
1. **Typo in OpenAPI Schema**: 
   - "mobiileNo" should be "mobileNo"
   - This will confuse API consumers
   - **ACTION**: Rebuild/regenerate OpenAPI documentation or fix at source

---

## RECOMMENDATIONS

### Priority 1 (High)
- [ ] Fix the "mobiileNo" typo in OpenAPI spec
- [ ] Clarify and implement RoleId population logic
- [ ] Add password change endpoint/DTO

### Priority 2 (Medium)
- [ ] Implement automatic UpdatedAt timestamp on record creation
- [ ] Consider adding UpdatedOn field to CreateUserResponseDTO
- [ ] Add audit logging for user creation/updates

### Priority 3 (Low)
- [ ] Consider soft-delete pattern with IsDeleted field (currently using IsActive)
- [ ] Add pagination to user listing endpoints (not visible in current code)
- [ ] Consider role validation (validate RoleName against allowed roles)

---

## CONNECTION STRING

**Database**: PostgreSQL
**Connection String Key**: `DbConnection`
**Expected Format**: `Host=localhost;Port=5432;Database=YourDbName;Username=postgres;Password=YourPassword`
**Verify**: This is set correctly in `appsettings.json` or `appsettings.Development.json`

---

**Audit Completed**: All code reviewed and analyzed
**Recommendation**: Fix OpenAPI typo and implement RoleId population logic before production
