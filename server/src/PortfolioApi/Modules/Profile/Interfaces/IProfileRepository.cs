using PortfolioApi.Modules.Profile.Entities;

namespace PortfolioApi.Modules.Profile.Interfaces;

public interface IProfileRepository
{
    Task<DeveloperProfile?> GetAsync();
    Task<long> CountAsync();
    Task InsertAsync(DeveloperProfile profile);
}
