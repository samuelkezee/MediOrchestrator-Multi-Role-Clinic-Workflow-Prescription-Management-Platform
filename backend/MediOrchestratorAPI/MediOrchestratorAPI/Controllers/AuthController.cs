using MediOrchestratorAPI.Data;
using MediOrchestratorAPI.Models.DTOs.Auth;
using MediOrchestratorAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace MediOrchestratorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly AppDbContext _dbContext;

        public AuthController(IAuthService authService, AppDbContext dbContext)
        {
            _authService = authService;
            _dbContext = dbContext;
        }

        /// Login user and get JWT token
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var response = await _authService.LoginAsync(request);
                if (response == null)
                {
                    return Unauthorized(new { message = "Invalid username or password" });
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred during login", error = ex.Message });
            }
        }

    }
}
