using MediOrchestratorAPI.Models.DTOs.Doctor;
using System.ComponentModel.DataAnnotations;

namespace MediOrchestratorAPI.Models.DTOs.Users
{
    public class UpdateUserRequestDTO
    {
        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string MobileNo { get; set; } = string.Empty;

        [Required]
        public string RoleName { get; set; } = string.Empty;

        public DoctorProfileRequestDTO? DoctorProfile { get; set; }
    }
}



 

9i \]+