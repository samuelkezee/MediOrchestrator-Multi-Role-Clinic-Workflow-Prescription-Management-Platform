using MediOrchestratorAPI.Models.DTOs.Patient;

namespace MediOrchestratorAPI.Services.Interface
{
    public interface IPatientService
    {
        Task<PatientResponseDTO> CreatePatientAsync(PatientDTO patientDTO);
        Task<List<PatientResponseDTO>> GetAllPatientsAsync();
        Task<PatientResponseDTO?> GetPatientByIdAsync(int id);
        Task<PatientResponseDTO?> UpdatePatientByIdAsync(int id, PatientDTO patientDTO);
        Task<bool> DeletePatientByIdAsync(int id);
    }
}
