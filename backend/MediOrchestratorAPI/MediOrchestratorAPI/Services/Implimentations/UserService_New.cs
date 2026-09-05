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

        public UserService(AppDbContext context, IPasswordHasher<UserAccount> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }



        /// Create a new user
 
        public async Task<CreateUserResponseDTO> CreateUserAsync(CreateUserRequestDTO request)
        {
            // Check if email already exists
            var emailTaken = await _context.UserAccount
                .AnyAsync(u => u.Email == request.Email);

            if (emailTaken)
            {
                throw new InvalidOperationException("User with the same email already exists.");
            }

            // Convert request DTO to entity
            var userAccount = UserMapper.ToEntity(request);
            userAccount.PasswordHash = _passwordHasher.HashPassword(userAccount, request.Password);

            _context.UserAccount.Add(userAccount);
            await _context.SaveChangesAsync();

            return UserMapper.ToDto(userAccount);
        }


        /// Get all users
        public async Task<List<CreateUserResponseDTO>> GetAllUsersAsync()
        {
            var users = await _context.UserAccount.ToListAsync();
            return [.. users.Select(UserMapper.ToDto)];
        }

        /// Get user by ID

        public async Task<CreateUserResponseDTO> GetUserByIdAsync(int id)
        {
            var user = await _context.UserAccount.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }
            return UserMapper.ToDto(user);
        }




        /// Update existing user

        public async Task<CreateUserResponseDTO> UpdateUserAsync(int id, UpdateUserRequestDTO request)
        {
            var existingUser = await _context.UserAccount
                .FirstOrDefaultAsync(u => u.Id == id);

            if (existingUser == null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }

            // Only check uniqueness if the email is changing
            if (existingUser.Email != request.Email)
            {
                var emailTaken = await _context.UserAccount
                    .AnyAsync(u => u.Email == request.Email && u.Id != id);

                if (emailTaken)
                {
                    throw new InvalidOperationException("Email is already in use");
                }
            }

            UserMapper.ApplyUpdate(request, existingUser);
            existingUser.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return UserMapper.ToDto(existingUser);
        }

        /// <summary>
        /// Delete user by ID
        /// </summary>
        public async Task DeleteUserAsync(int id)
        {
            var existingUser = await _context.UserAccount
                .FirstOrDefaultAsync(u => u.Id == id);

            if (existingUser == null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }

            _context.UserAccount.Remove(existingUser);
            await _context.SaveChangesAsync();
        }
    }
}
