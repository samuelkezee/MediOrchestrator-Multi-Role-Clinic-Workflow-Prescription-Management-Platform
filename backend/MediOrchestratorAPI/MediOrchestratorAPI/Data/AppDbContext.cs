using MediOrchestratorAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MediOrchestratorAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<UserAccount> UserAccount { get; set; } = null!;
        public DbSet<Patients> Patients { get; set; } = null!;
    }
}
