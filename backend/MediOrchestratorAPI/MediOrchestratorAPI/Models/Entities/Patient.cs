using System.ComponentModel.DataAnnotations.Schema;

namespace MediOrchestratorAPI.Models.Entities
{
    [Table("Patient")]
    public class Patient
    {
        public int Id {  get; set; }

        public string FullName { get; set; } = string.Empty;

        public String Gender { get; set; } = string.Empty;

        public string MobileNo { get; set; } = string.Empty;

        public string BloodGroup { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Visit> Visits { get; set; } = new List<Visit>();

    }
}
