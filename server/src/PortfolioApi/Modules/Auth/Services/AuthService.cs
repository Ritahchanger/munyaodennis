using PortfolioApi.Common.Exceptions;
using PortfolioApi.Modules.Auth.Dtos;
using PortfolioApi.Modules.Auth.Entities;
using PortfolioApi.Modules.Auth.Interfaces;

namespace PortfolioApi.Modules.Auth.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;

    public AuthService(IUserRepository userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedApiException("Invalid email or password.");
        }

        var (token, expiresAt) = _tokenService.GenerateToken(user);

        return new AuthResponseDto
        {
            Token = token,
            ExpiresAt = expiresAt,
            User = ToCurrentUserDto(user),
        };
    }

    public async Task<CurrentUserDto> GetCurrentUserAsync(string userId)
    {
        var user = await _userRepository.GetByIdAsync(userId)
            ?? throw new NotFoundException("User not found.");

        return ToCurrentUserDto(user);
    }

    public async Task ChangePasswordAsync(string userId, ChangePasswordDto dto)
    {
        var user = await _userRepository.GetByIdAsync(userId)
            ?? throw new NotFoundException("User not found.");

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
        {
            throw new UnauthorizedApiException("Current password is incorrect.");
        }

        var newHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        await _userRepository.UpdatePasswordHashAsync(userId, newHash);
    }

    private static CurrentUserDto ToCurrentUserDto(User user) => new()
    {
        Id = user.Id,
        Name = user.Name,
        Email = user.Email,
        Role = user.Role,
    };
}
