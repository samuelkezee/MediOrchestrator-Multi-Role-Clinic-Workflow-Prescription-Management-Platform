using System.ComponentModel.DataAnnotations.Schema;

namespace MediOrchestratorAPI.Models.Entities
{
    [Table("Patient")]
    public class Patients
    {
        public int Id {  get; set; }

        public string FullName { get; set; } = string.Empty;

        public String Gender { get; set; } = string.Empty;

        public string MobileNo { get; set; } = string.Empty;

        public string BloodGroup { get; set; } = string.Empty;

        public DateTime DateOfBirth= DateTime.MinValue;

        public string Address { get; set; } = string.Empty;


    }
}
