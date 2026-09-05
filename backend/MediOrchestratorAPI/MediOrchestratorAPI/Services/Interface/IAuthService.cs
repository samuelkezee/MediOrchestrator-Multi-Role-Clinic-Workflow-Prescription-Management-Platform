using MediOrchestratorAPI.Models.DTOs.Auth;

namespace MediOrchestratorAPI.Services.Interface
{
    public interface IAuthService
    {
        Task<LoginResponse?> LoginAsync(LoginRequest request);
        
    }
}
