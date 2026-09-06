
using MediOrchestratorAPI.Data;
using MediOrchestratorAPI.Mapper;
using MediOrchestratorAPI.Models.DTOs.Users;
using MediOrchestratorAPI.Models.Entities;
using MediOrchestratorAPI.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MediOrchestratorAPI.Services.Implimentations
{
    public class UserService : IUserServices
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<UserAccount> _passwordHasher;

        private const string DoctorRole = "Doctor";

        public UserService(AppDbContext context, IPasswordHasher<UserAccount> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        /// <summary>
        /// Create a new user. If RoleName is "Doctor", also creates the linked Doctor profile.
        /// </summary>
        public async Task<CreateUserResponseDTO> CreateUserAsync(CreateUserRequestDTO request)
        {
            // ---- Validate up front, before touching the database ----
            var emailTaken = await _context.UserAccount
                .AnyAsync(u => u.Email == request.Email);

            if (emailTaken)
                throw new InvalidOperationException("User with the same email already exists.");

            if (request.RoleName == DoctorRole && request.DoctorProfile == null)
                throw new InvalidOperationException("DoctorProfile is required when RoleName is 'Doctor'.");

            // ---- STEP 1: always create the base UserAccount ----
            var userAccount = UserMapper.ToEntity(request);
            userAccount.PasswordHash = _passwordHasher.HashPassword(userAccount, request.Password);

            _context.UserAccount.Add(userAccount);
            await _context.SaveChangesAsync(); // need userAccount.Id generated before Step 2

            // ---- STEP 2: only if this user is a Doctor ----
            if (request.RoleName == DoctorRole)
            {
                var doctor = UserMapper.ToDoctorEntity(request.DoctorProfile!, userAccount.Id);
                _context.Doctor.Add(doctor);
                await _context.SaveChangesAsync();

                userAccount.DoctorProfile = doctor; // attach in memory so ToDto can flatten it
            }

            return UserMapper.ToDto(userAccount);
        }

        /// <summary>
        /// Get all users, including doctor profiles where applicable
        /// </summary>
        public async Task<List<CreateUserResponseDTO>> GetAllUsersAsync()
        {
            var users = await _context.UserAccount
                .Include(u => u.DoctorProfile)   // eager-load so mapper can flatten it
                .ToListAsync();

            return [.. users.Select(UserMapper.ToDto)];
        }

        /// <summary>
        /// Get user by ID, including doctor profile if applicable
        /// </summary>
        public async Task<CreateUserResponseDTO> GetUserByIdAsync(int id)
        {
            var user = await _context.UserAccount
                .Include(u => u.DoctorProfile)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                throw new KeyNotFoundException($"User with id {id} not found");

            return UserMapper.ToDto(user);
        }

        /// <summary>
        /// Update existing user. Creates/updates/removes the Doctor profile
        /// depending on the new RoleName.
        /// </summary>
        public async Task<CreateUserResponseDTO> UpdateUserAsync(int id, UpdateUserRequestDTO request)
        {
            var existingUser = await _context.UserAccount
                .Include(u => u.DoctorProfile)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (existingUser == null)
                throw new KeyNotFoundException($"User with id {id} not found");

            if (existingUser.Email != request.Email)
            {
                var emailTaken = await _context.UserAccount
                    .AnyAsync(u => u.Email == request.Email && u.Id != id);

                if (emailTaken)
                    throw new InvalidOperationException("Email is already in use");
            }

            if (request.RoleName == DoctorRole && request.DoctorProfile == null)
                throw new InvalidOperationException("DoctorProfile is required when RoleName is 'Doctor'.");

            UserMapper.ApplyUpdate(request, existingUser);

            // ---- Reconcile the Doctor profile against the (possibly new) role ----
            if (request.RoleName == DoctorRole)
            {
                if (existingUser.DoctorProfile == null)
                {
                    // wasn't a doctor before -> create the profile now
                    var doctor = UserMapper.ToDoctorEntity(request.DoctorProfile!, existingUser.Id);
                    _context.Doctor.Add(doctor);
                    existingUser.DoctorProfile = doctor;
                }
                else
                {
                    // already a doctor -> just update the existing profile fields
                    UserMapper.ApplyDoctorUpdate(request.DoctorProfile!, existingUser.DoctorProfile);
                }
            }
            else if (existingUser.DoctorProfile != null)
            {
                // role changed AWAY from Doctor -> remove the now-invalid Doctor profile
                _context.Doctor.Remove(existingUser.DoctorProfile);
                existingUser.DoctorProfile = null;
            }

            await _context.SaveChangesAsync();

            return UserMapper.ToDto(existingUser);
        }

        /// <summary>
        /// Delete user by ID. Doctor profile (if any) cascades automatically via FK.
        /// </summary>
        public async Task DeleteUserAsync(int id)
        {
            var existingUser = await _context.UserAccount
                .FirstOrDefaultAsync(u => u.Id == id);

            if (existingUser == null)
                throw new KeyNotFoundException($"User with id {id} not found");

            _context.UserAccount.Remove(existingUser);
            await _context.SaveChangesAsync(); // Doctor row removed automatically (Cascade)
        }
    }
}