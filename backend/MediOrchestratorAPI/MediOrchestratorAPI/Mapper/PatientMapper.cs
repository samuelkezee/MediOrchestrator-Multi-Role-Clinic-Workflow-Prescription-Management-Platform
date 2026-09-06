using MediOrchestratorAPI.Models.DTOs.Patient;
using MediOrchestratorAPI.Models.Entities;

namespace MediOrchestratorAPI.Mapper
{
    public static class PatientMapper
    {
        // Patient Entity → PatientResponseDTO
        public static PatientResponseDTO ToDTO(Patient patient)
        {
            return new PatientResponseDTO
            {
                FullName = patient.FullName,
                Gender = patient.Gender,
                MobileNo = patient.MobileNo,
                BloodGroup = patient.BloodGroup,
                DateOfBirth = patient.DateOfBirth,
                Address = patient.Address
            };
        }

        // PatientDTO → Patient Entity
        public static Patient ToEntity(PatientDTO patient)
        {
            return new Patient
            {
                FullName = patient.FullName,
                Gender = patient.Gender,
                MobileNo = patient.MobileNo,
                BloodGroup = patient.BloodGroup,
                DateOfBirth = patient.DateOfBirth,
                Address = patient.Address
            };
        }
        public static Patient ApplyUpdate(Patient patient,PatientDTO dto)
        {
            patient.FullName = dto.FullName;
            patient.Gender = dto.Gender;
            patient.MobileNo = dto.MobileNo;
            patient.BloodGroup = dto.BloodGroup;
            patient.DateOfBirth = dto.DateOfBirth;
            patient.Address = dto.Address;

            return patient;
        }


    }
}