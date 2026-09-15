using PortfolioApi.Common.Responses;
using PortfolioApi.Modules.Articles.Dtos;

namespace PortfolioApi.Modules.Articles.Interfaces;

public interface IArticleService
{
    Task<PagedResult<ArticleDto>> GetPagedAsync(string? source, string? search, int page, int pageSize);
    Task<ArticleDto> CreateAsync(CreateArticleDto dto);
    Task<ArticleDto> UpdateAsync(string id, UpdateArticleDto dto);
    Task DeleteAsync(string id);
}
