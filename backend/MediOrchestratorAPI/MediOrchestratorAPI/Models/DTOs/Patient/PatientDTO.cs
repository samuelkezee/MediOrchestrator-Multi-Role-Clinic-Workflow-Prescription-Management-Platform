using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediOrchestratorAPI.Models.DTOs.Patient
{
    public class PatientDTO
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        public String Gender { get; set; } = string.Empty;

        [Required]
        public string MobileNo { get; set; } = string.Empty;

        [Required]
        public string BloodGroup { get; set; } = string.Empty;

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Address { get; set; } = string.Empty;

    };



}
