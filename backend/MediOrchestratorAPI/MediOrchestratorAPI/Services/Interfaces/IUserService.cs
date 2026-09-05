using MediOrchestratorAPI.Models.DTOs.Users;

namespace MediOrchestratorAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<CreateUserResponseDTO> CreateUserAsync(CreateUserRequestDTO request);
        Task<List<CreateUserResponseDTO>> GetAllUsersAsync();
        Task<CreateUserResponseDTO> GetUserByIdAsync(int id);
        Task<CreateUserResponseDTO> UpdateUserAsync(int id, UpdateUserRequestDTO request);
        Task DeleteUserAsync(int id);
    }
}
