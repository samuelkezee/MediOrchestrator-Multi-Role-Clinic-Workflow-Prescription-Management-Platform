using MediOrchestratorAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace MediOrchestratorAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<UserAccount> UserAccount { get; set; } = null!;
        public DbSet<Patient> Patient { get; set; } = null!;
        public DbSet<Medicines> Medicines { get; set; } = null!;
        public DbSet<Visit> Visits { get; set; }=null!;
        public DbSet<PrescriptionItem> PrescriptionItems { get; set; }= null!;

        public DbSet<Doctor> Doctors { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ---- UserAccount ----
            modelBuilder.Entity<UserAccount>()
                .HasIndex(s => s.Email)
                .IsUnique();

            // ---- Doctor: 1-to-1 with UserAccount, shared primary key ----
            modelBuilder.Entity<Doctor>()
                .HasOne(d => d.userAccount)
                .WithOne(ua => ua.DoctorProfile)
                .HasForeignKey<Doctor>(d => d.Id)
                .OnDelete(DeleteBehavior.Cascade); // deleting UserAccount removes Doctor profile too

            // ---- Visit -> Doctor (extension table, not UserAccount directly) ----
            modelBuilder.Entity<Visit>()
                .HasOne(v => v.Doctor)
                .WithMany(d => d.Visits)
                .HasForeignKey(v => v.DoctorId)
                .OnDelete(DeleteBehavior.Restrict); // don't cascade-delete visit history

            // ---- Visit -> Patient ----
            modelBuilder.Entity<Visit>()
                .HasOne(v => v.Patient)
                .WithMany(p => p.Visits)
                .HasForeignKey(v => v.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            // ---- Visit -> CreatedByStaff (Receptionist/Admin who booked it) ----
            modelBuilder.Entity<Visit>()
                .HasOne(v => v.CreatedByStaff)
                .WithMany(s => s.VisitsCreated)
                .HasForeignKey(v => v.CreatedByStaffId)
                .OnDelete(DeleteBehavior.Restrict);

            // ---- PrescriptionItem -> Visit ----
            modelBuilder.Entity<PrescriptionItem>()
                .HasOne(pi => pi.Visit)
                .WithMany(v => v.PrescriptionItems)
                .HasForeignKey(pi => pi.VisitId)
                .OnDelete(DeleteBehavior.Cascade); // deleting a visit removes its prescription items

            // ---- PrescriptionItem -> Medicine ----
            modelBuilder.Entity<PrescriptionItem>()
                .HasOne(pi => pi.Medicine)
                .WithMany(pi => pi.PrescriptionItems)
                .HasForeignKey(pi => pi.MedicineId)
                .OnDelete(DeleteBehavior.Restrict);


        }



    }
}
