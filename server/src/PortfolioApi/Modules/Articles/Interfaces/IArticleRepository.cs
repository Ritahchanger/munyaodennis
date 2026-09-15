using PortfolioApi.Modules.Articles.Entities;

namespace PortfolioApi.Modules.Articles.Interfaces;

public interface IArticleRepository
{
    Task<List<Article>> GetPagedAsync(string? source, string? search, int page, int pageSize);
    Task<Article?> GetByIdAsync(string id);
    Task<long> CountAsync(string? source, string? search);
    Task<long> CountAsync();
    Task InsertAsync(Article article);
    Task InsertManyAsync(IEnumerable<Article> articles);
    Task<bool> ReplaceAsync(string id, Article article);
    Task<bool> DeleteAsync(string id);
}
