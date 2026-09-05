using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MediOrchestratorAPI.Models.DTOs.Auth
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }=string.Empty;

        [Required]
        [PasswordPropertyText]
        public string Password { get; set; }=string.Empty;
    }
}
