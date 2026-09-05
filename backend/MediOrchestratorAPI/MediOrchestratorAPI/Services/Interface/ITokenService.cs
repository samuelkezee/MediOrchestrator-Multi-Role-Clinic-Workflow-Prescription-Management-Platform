using MediOrchestratorAPI.Models.DTOs.Auth;
using MediOrchestratorAPI.Models.Entities;
using MediOrchestratorAPI.Services.Implimentations;

namespace MediOrchestratorAPI.Services.Interface
{
    public interface ITokenService
    {
        TokenResult GenerateToken(UserAccount user);
    }
}
