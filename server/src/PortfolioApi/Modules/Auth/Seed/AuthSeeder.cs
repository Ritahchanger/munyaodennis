using PortfolioApi.Data.Seed;
using PortfolioApi.Modules.Auth.Entities;
using PortfolioApi.Modules.Auth.Interfaces;

namespace PortfolioApi.Modules.Auth.Seed;

/// <summary>
/// Seeds a single fake admin account for local/demo authentication.
/// These are intentionally hardcoded, non-production demo credentials:
/// email admin@portfolio.dev / password Admin@123. Replace before any real deployment.
/// </summary>
public class AuthSeeder : IDataSeeder
{
    private readonly IUserRepository _userRepository;

    public AuthSeeder(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task SeedAsync()
    {
        if (await _userRepository.CountAsync() > 0)
        {
            return;
        }

        var fakeAdmin = new User
        {
            Name = "Dennis Munyao",
            Email = "admin@portfolio.dev",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            Role = "admin",
        };

        await _userRepository.InsertAsync(fakeAdmin);
    }
}
