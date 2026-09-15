using PortfolioApi.Modules.Auth.Entities;

namespace PortfolioApi.Modules.Auth.Interfaces;

public interface ITokenService
{
    (string Token, DateTime ExpiresAt) GenerateToken(User user);
}
