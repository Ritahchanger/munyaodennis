using PortfolioApi.Modules.Auth.Dtos;

namespace PortfolioApi.Modules.Auth.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginRequestDto request);
    Task<CurrentUserDto> GetCurrentUserAsync(string userId);
    Task ChangePasswordAsync(string userId, ChangePasswordDto dto);
}
