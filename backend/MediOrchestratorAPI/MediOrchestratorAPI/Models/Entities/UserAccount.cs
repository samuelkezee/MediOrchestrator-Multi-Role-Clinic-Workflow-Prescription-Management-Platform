using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediOrchestratorAPI.Models.Entities
{
    [Table("user_account")]
    public class UserAccount
    {
        public int Id { get; set; }
        public string FullName { get; set; }= string.Empty;

        public string Email { get; set; }=string.Empty;
        public string PasswordHash { get; set; }= string.Empty;

        public string MobileNo { get; set; } = string.Empty;

        public string RoleName { get; set; }=string.Empty;

        public bool? IsActive { get; set; } = true;

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; internal set; }
    }
}
