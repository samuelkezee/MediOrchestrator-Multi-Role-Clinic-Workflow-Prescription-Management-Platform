using System.Numerics;

namespace MediOrchestratorAPI.Models.Entities
{
    public class Visit
    {
        public int Id { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public int DoctorId { get; set; }         // FK -> Doctor.Id (enforced: must be a real doctor)
        public Doctor Doctor { get; set; }

        public int CreatedByStaffId { get; set; } // FK -> Staff.Id (receptionist/admin who booked it)
        public Staff CreatedByStaff { get; set; }

        public DateTime VisitDate { get; set; }
        public string Reason { get; set; }
        public string Notes { get; set; }
        public string VisitStatus { get; set; } = "Scheduled"; // Scheduled / InProgress / Completed / Cancelled

        public ICollection<PrescriptionItem> PrescriptionItems { get; set; } = new List<PrescriptionItem>();
    }
}
}
