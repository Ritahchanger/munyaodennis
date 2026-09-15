using PortfolioApi.Modules.Profile.Dtos;

namespace PortfolioApi.Modules.Profile.Interfaces;

public interface IProfileService
{
    Task<DeveloperProfileDto> GetProfileAsync();
}
