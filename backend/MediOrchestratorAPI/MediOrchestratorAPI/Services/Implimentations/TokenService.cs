using MediOrchestratorAPI.Models.Entities;
using MediOrchestratorAPI.Services.Interface;
using MediOrchestratorAPI.Models.DTOs.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MediOrchestratorAPI.Services.Implimentations
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<TokenService> _logger;

        public TokenService(IConfiguration configuration, ILogger<TokenService> logger)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public TokenResult GenerateToken(UserAccount user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "User account cannot be null");
            }

            try
            {
                // Get JWT configuration values
                var jwtKey = _configuration["Jwt:Key"] 
                    ?? throw new InvalidOperationException("JWT Key is not configured in appsettings.json");
                var jwtIssuer = _configuration["Jwt:Issuer"] 
                    ?? throw new InvalidOperationException("JWT Issuer is not configured in appsettings.json");
                var jwtAudience = _configuration["Jwt:Audience"] 
                    ?? throw new InvalidOperationException("JWT Audience is not configured in appsettings.json");

                if (!double.TryParse(_configuration["Jwt:ExpirationMinutes"], out var expirationMinutes))
                {
                    expirationMinutes = 60; // Default to 60 minutes if not configured
                    _logger.LogWarning("JWT:ExpirationMinutes not configured properly, using default 60 minutes");
                }

                var expiresOn = DateTime.UtcNow.AddMinutes(expirationMinutes);

                // Create claims from user account
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.FullName),
                    new Claim(ClaimTypes.Role, user.RoleName),


                };

                // Create signing key and credentials
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                // Build JWT token
                var token = new JwtSecurityToken(
                    issuer: jwtIssuer,
                    audience: jwtAudience,
                    claims: claims,
                    expires: expiresOn,
                    signingCredentials: credentials);

                // Write token to string
                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                _logger.LogInformation("JWT token generated successfully for user {UserId}", user.Id);

                return new TokenResult
                {
                    Token = tokenString,
                    ExpiresOn = expiresOn
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating JWT token for user {UserId}: {ErrorMessage}", user.Id, ex.Message);
                throw;
            }
        }
    }
}
