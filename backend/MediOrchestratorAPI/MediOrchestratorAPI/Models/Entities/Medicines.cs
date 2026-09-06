using System.ComponentModel.DataAnnotations.Schema;

namespace MediOrchestratorAPI.Models.Entities
{


    [Table("Medicines")]
    public class Medicines
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string Manufacturer { get; set; }
        public string Strength { get; set; } = string.Empty;

        public decimal Price { get; set; }
        public string Form { get; set; } = string.Empty;

        public int StockQuantity { get; set; };

        public ICollection<PrescriptionItem> PrescriptionItems { get; set; } = new List<PrescriptionItem>()
    }
}
