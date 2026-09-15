using PortfolioApi.Modules.Works.Entities;

namespace PortfolioApi.Modules.Works.Interfaces;

public interface IWorkRepository
{
    Task<List<Work>> GetPagedAsync(string? category, string? search, int page, int pageSize);
    Task<Work?> GetByIdAsync(string id);
    Task<long> CountAsync(string? category, string? search);
    Task<long> CountAsync();
    Task<List<string>> GetDistinctCategoriesAsync();
    Task InsertAsync(Work work);
    Task InsertManyAsync(IEnumerable<Work> works);
    Task<bool> ReplaceAsync(string id, Work work);
    Task<bool> DeleteAsync(string id);
}
