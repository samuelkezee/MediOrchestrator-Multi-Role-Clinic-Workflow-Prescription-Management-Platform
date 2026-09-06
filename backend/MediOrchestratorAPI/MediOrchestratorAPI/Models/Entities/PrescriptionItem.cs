namespace MediOrchestratorAPI.Models.Entities
{
    public class PrescriptionItem
    {
        public int Id { get; set; }

        public int VisitId { get; set; }
        public Visit Visit { get; set; }

        public int MedicineId { get; set; }
        public Medicines Medicine { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }     
        public int DurationDays { get; set; }
        public string SpecialInstructions { get; set; }
    }
}
