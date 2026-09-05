using MediOrchestratorAPI.Models.DTOs.Users;

namespace MediOrchestratorAPI.Models.DTOs.Auth
{
    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;

        public DateTime ExpiresOn { get; set; }

        public CreateUserResponseDTO User { get; set; } = new();
    }
}
