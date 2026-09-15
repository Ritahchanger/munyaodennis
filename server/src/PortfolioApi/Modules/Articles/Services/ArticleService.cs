using PortfolioApi.Common.Exceptions;
using PortfolioApi.Common.Responses;
using PortfolioApi.Modules.Articles.Dtos;
using PortfolioApi.Modules.Articles.Entities;
using PortfolioApi.Modules.Articles.Interfaces;

namespace PortfolioApi.Modules.Articles.Services;

public class ArticleService : IArticleService
{
    private readonly IArticleRepository _repository;

    public ArticleService(IArticleRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResult<ArticleDto>> GetPagedAsync(string? source, string? search, int page, int pageSize)
    {
        var articles = await _repository.GetPagedAsync(source, search, page, pageSize);
        var totalCount = await _repository.CountAsync(source, search);

        return PagedResult<ArticleDto>.Create(articles.Select(ToDto).ToList(), page, pageSize, totalCount);
    }

    public async Task<ArticleDto> CreateAsync(CreateArticleDto dto)
    {
        var article = new Article
        {
            Source = dto.Source,
            Title = dto.Title,
            Url = dto.Url,
            Excerpt = dto.Excerpt,
            ImageUrl = dto.ImageUrl,
            PublishedAt = dto.PublishedAt,
            Tags = dto.Tags,
        };

        await _repository.InsertAsync(article);
        return ToDto(article);
    }

    public async Task<ArticleDto> UpdateAsync(string id, UpdateArticleDto dto)
    {
        var existing = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Article not found.");

        existing.Source = dto.Source;
        existing.Title = dto.Title;
        existing.Url = dto.Url;
        existing.Excerpt = dto.Excerpt;
        existing.ImageUrl = dto.ImageUrl;
        existing.PublishedAt = dto.PublishedAt;
        existing.Tags = dto.Tags;

        await _repository.ReplaceAsync(id, existing);
        return ToDto(existing);
    }

    public async Task DeleteAsync(string id)
    {
        var deleted = await _repository.DeleteAsync(id);
        if (!deleted)
        {
            throw new NotFoundException("Article not found.");
        }
    }

    private static ArticleDto ToDto(Article article) => new()
    {
        Id = article.Id,
        Source = article.Source,
        Title = article.Title,
        Url = article.Url,
        Excerpt = article.Excerpt,
        ImageUrl = article.ImageUrl,
        PublishedAt = article.PublishedAt,
        Tags = article.Tags,
    };
}
