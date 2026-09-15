using PortfolioApi.Modules.Auth.Entities;

namespace PortfolioApi.Modules.Auth.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByIdAsync(string id);
    Task<long> CountAsync();
    Task InsertAsync(User user);
    Task<bool> UpdatePasswordHashAsync(string id, string passwordHash);
}
