// Mapper/UserMapper.cs
using MediOrchestratorAPI.Models.DTOs.Users;
using MediOrchestratorAPI.Models.Entities;

namespace MediOrchestratorAPI.Mapper
{
    public static class UserMapper
    {
        // Entity -> Response DTO (flattens DoctorProfile if present)
        public static CreateUserResponseDTO ToDto(UserAccount user)
        {
            return new CreateUserResponseDTO
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                MobileNo = user.MobileNo,
                RoleName = user.RoleName,
                IsActive = user.IsActive ?? false,
                CreatedOn = user.CreatedOn,

                // Flatten doctor fields — null if not a doctor / profile not loaded
                Specialization = user.DoctorProfile?.Specialization,
                LicenseNumber = user.DoctorProfile?.LicenseNumber,
                ConsultationFee = user.DoctorProfile?.ConsultationFee
            };
        }

        // Request DTO -> UserAccount entity (base fields only — Doctor handled separately in the service)
        public static UserAccount ToEntity(CreateUserRequestDTO request)
        {
            return new UserAccount
            {
                FullName = request.FullName,
                Email = request.Email,
                MobileNo = request.MobileNo,
                RoleName = request.RoleName,
                CreatedOn = DateTime.UtcNow,
                IsActive = true
            };
        }

        // Doctor sub-DTO -> Doctor entity (Id must be set separately by the caller)
        public static Doctor ToDoctorEntity(Models.DTOs.Doctor.DoctorProfileRequestDTO dto, int userAccountId)
        {
            return new Doctor
            {
                Id = userAccountId,
                Specialization = dto.Specialization,
                LicenseNumber = dto.LicenseNumber,
                ConsultationFee = dto.ConsultationFee
            };
        }

        public static void ApplyUpdate(UpdateUserRequestDTO dto, UserAccount existingEntity)
        {
            existingEntity.FullName = dto.FullName;
            existingEntity.Email = dto.Email;
            existingEntity.MobileNo = dto.MobileNo;
            existingEntity.RoleName = dto.RoleName;
            existingEntity.UpdatedAt = DateTime.UtcNow;
        }

        // Applies doctor fields onto an existing (or newly created) Doctor entity
        public static void ApplyDoctorUpdate(Models.DTOs.Doctor.DoctorProfileRequestDTO dto, Doctor existingDoctor)
        {
            existingDoctor.Specialization = dto.Specialization;
            existingDoctor.LicenseNumber = dto.LicenseNumber;
            existingDoctor.ConsultationFee = dto.ConsultationFee;
        }
    }
}