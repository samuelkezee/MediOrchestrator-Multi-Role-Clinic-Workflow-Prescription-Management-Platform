using MediOrchestratorAPI.Models.DTOs.Patient;
using MediOrchestratorAPI.Models.DTOs.Users;

namespace MediOrchestratorAPI.Services.Interface
{
    public interface IUserServices
    {
        Task<CreateUserResponseDTO> CreateUserAsync(CreateUserRequestDTO request);
        Task<List<CreateUserResponseDTO>> GetAllUsersAsync();
        Task<CreateUserResponseDTO> GetUserByIdAsync(int id);
        Task<CreateUserResponseDTO> UpdateUserAsync(int id, UpdateUserRequestDTO request);
        Task DeleteUserAsync(int id);
    }
}
