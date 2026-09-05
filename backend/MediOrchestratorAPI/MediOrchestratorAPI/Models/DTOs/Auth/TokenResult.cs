namespace MediOrchestratorAPI.Models.DTOs.Auth
{
    public class TokenResult
    {
        public string Token { get; set; } = string.Empty;

        public DateTime ExpiresOn { get; set; }
    }
}
