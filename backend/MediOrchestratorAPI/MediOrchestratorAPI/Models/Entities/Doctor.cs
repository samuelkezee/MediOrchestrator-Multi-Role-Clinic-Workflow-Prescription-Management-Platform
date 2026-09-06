namespace MediOrchestratorAPI.Models.Entities
{
    public class Doctor
    {
        public int Id { get; set; }              
        public string Specialization { get; set; }
        public string LicenseNumber { get; set; }
        public decimal ConsultationFee { get; set; }

        public UserAccount userAccount { get; set; }
        public ICollection<Visit> Visits { get; set; } = new List<Visit>();
    }
}
