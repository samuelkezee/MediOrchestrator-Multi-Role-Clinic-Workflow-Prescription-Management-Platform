using MediOrchestratorAPI.Models.DTOs.Auth;

namespace MediOrchestratorAPI.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponse?> LoginAsync(LoginRequest request);
    }
}
