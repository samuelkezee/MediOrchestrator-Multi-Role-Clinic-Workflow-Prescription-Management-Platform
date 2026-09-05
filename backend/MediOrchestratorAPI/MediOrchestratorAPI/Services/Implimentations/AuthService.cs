using System.Linq;
using System.Threading.Tasks;
using MediOrchestratorAPI.Services.Interface;
using MediOrchestratorAPI.Models.DTOs.Auth;
using MediOrchestratorAPI.Data;
using Microsoft.AspNetCore.Identity;
using MediOrchestratorAPI.Models.Entities;
using System.Data;
using Microsoft.EntityFrameworkCore;
using MediOrchestratorAPI.Mapper;
using MediOrchestratorAPI.Models.DTOs.Users;

namespace MediOrchestratorAPI.Services.Implimentations
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<UserAccount> _passwordHasher;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            AppDbContext context,
            IPasswordHasher<UserAccount> passwordHasher,
            ITokenService tokenService,
            ILogger<AuthService> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<LoginResponse?> LoginAsync(LoginRequest request)
        {
            if (request == null)
            {
                _logger.LogWarning("Login request is null");
                return null;
            }

            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                _logger.LogWarning("Login attempt with empty email or password");
                return null;
            }

            try
            {
                var user = await _context.UserAccount.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (user == null)
                {
                    _logger.LogWarning("Login attempt for non-existent user: {Email}", request.Email);
                    return null;
                }


                var verificationResult = _passwordHasher.VerifyHashedPassword(
                    user, user.PasswordHash, request.Password);

                if (verificationResult == PasswordVerificationResult.Failed)
                {
                    _logger.LogWarning("Failed password verification for user: {UserId}", user.Id);
                    return null;
                }

                var tokenResult = _tokenService.GenerateToken(user);

                _logger.LogInformation("User successfully logged in: {UserId}", user.Id);

                return new LoginResponse
                {
                    Token = tokenResult.Token,
                    ExpiresOn = tokenResult.ExpiresOn,
                    User = UserMapper.ToDto(user)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during login for email: {Email}", request.Email);
                throw;
            }
        }
    }
}


