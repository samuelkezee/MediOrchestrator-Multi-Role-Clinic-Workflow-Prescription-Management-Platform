// Models/DTOs/Doctor/DoctorProfileRequestDTO.cs
using System.ComponentModel.DataAnnotations;

namespace MediOrchestratorAPI.Models.DTOs.Doctor
{
    public class DoctorProfileRequestDTO
    {
        [Required]
        [StringLength(150)]
        public string Specialization { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LicenseNumber { get; set; } = string.Empty;

        [Range(0, double.MaxValue)]
        public decimal ConsultationFee { get; set; }
    }
}
