
using MediOrchestratorAPI.Models.DTOs.Users;
using MediOrchestratorAPI.Models.Entities;
using System.Security.Cryptography.X509Certificates;

namespace MediOrchestratorAPI.Mapper
{
    public static class UserMapper

    {
        

        public static CreateUserResponseDTO ToDto(UserAccount user)
        {
            return new CreateUserResponseDTO
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                MobileNo = user.MobileNo,
                RoleName = user.RoleName,
                IsActive = user.IsActive ?? false, // Handle nullable boolean
                CreatedOn = user.CreatedOn
            };

        }
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

        public static void ApplyUpdate(UpdateUserRequestDTO dto, UserAccount existingEntity)
        {
            existingEntity.FullName = dto.FullName;
            existingEntity.Email = dto.Email;
            existingEntity.MobileNo = dto.MobileNo;
            existingEntity.RoleName = dto.RoleName;
            existingEntity.UpdatedAt = DateTime.UtcNow;
        }



    }
}