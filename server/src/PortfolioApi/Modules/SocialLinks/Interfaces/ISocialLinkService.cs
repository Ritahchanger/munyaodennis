using PortfolioApi.Modules.SocialLinks.Dtos;

namespace PortfolioApi.Modules.SocialLinks.Interfaces;

public interface ISocialLinkService
{
    Task<List<SocialLinkDto>> GetAllAsync();
    Task<SocialLinkDto> CreateAsync(CreateSocialLinkDto dto);
    Task<SocialLinkDto> UpdateAsync(string id, UpdateSocialLinkDto dto);
    Task DeleteAsync(string id);
}
