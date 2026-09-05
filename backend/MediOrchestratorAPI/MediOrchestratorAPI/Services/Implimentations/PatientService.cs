using MediOrchestratorAPI.Data;
using MediOrchestratorAPI.Mapper;
using MediOrchestratorAPI.Models.DTOs.Patient;
using MediOrchestratorAPI.Models.Entities;
using MediOrchestratorAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;
using System.Net.WebSockets;

namespace MediOrchestratorAPI.Services.Implimentations
{
    public class PatientService : IPatientService
    {
        private readonly AppDbContext _context;

        public PatientService(AppDbContext context)
        {
            _context = context;

        }


        //crete patient
        public async Task<PatientResponseDTO> CreatePatientAsync(PatientDTO patientDTO)
        {
            var patient = PatientMapper.ToEntity(patientDTO);
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return PatientMapper.ToDTO(patient);
        }

        //get all patients
        public async Task<List<PatientResponseDTO>> GetAllPatientsAsync()
        {
            var patients = await _context.Patients.ToListAsync();
            return patients.Select(p => PatientMapper.ToDTO(p)).ToList();
        }



        //get patient by id
        public async Task<PatientResponseDTO?> GetPatientByIdAsync(int id)
        {
            var patient = await _context.Patients.FindAsync(id);

            if (patient == null)
            {
                return null;
            }

            return PatientMapper.ToDTO(patient);
        }


        //update patient

        public async Task<PatientResponseDTO?> UpdatePatientByIdAsync(int id,PatientDTO patientDTO)
        {
            var existingPatient = await _context.Patients.FindAsync(id);

            if (existingPatient == null)
            {
                return null;
            }

            PatientMapper.ApplyUpdate(existingPatient, patientDTO);

            await _context.SaveChangesAsync();

            return PatientMapper.ToDTO(existingPatient);
        }





        // Delete patient

        public async Task<bool> DeletePatientByIdAsync(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return false;
            }
            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}