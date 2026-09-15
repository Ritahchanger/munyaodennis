using PortfolioApi.Modules.SocialLinks.Entities;

namespace PortfolioApi.Modules.SocialLinks.Interfaces;

public interface ISocialLinkRepository
{
    Task<List<SocialLink>> GetAllAsync();
    Task<SocialLink?> GetByIdAsync(string id);
    Task<long> CountAsync();
    Task InsertAsync(SocialLink link);
    Task InsertManyAsync(IEnumerable<SocialLink> links);
    Task<bool> ReplaceAsync(string id, SocialLink link);
    Task<bool> DeleteAsync(string id);
}
