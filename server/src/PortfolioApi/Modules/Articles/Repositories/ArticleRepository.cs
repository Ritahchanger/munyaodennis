using System.Text.RegularExpressions;
using MongoDB.Bson;
using MongoDB.Driver;
using PortfolioApi.Data;
using PortfolioApi.Modules.Articles.Entities;
using PortfolioApi.Modules.Articles.Interfaces;

namespace PortfolioApi.Modules.Articles.Repositories;

public class ArticleRepository : IArticleRepository
{
    private const string CollectionName = "articles";
    private readonly IMongoCollection<Article> _collection;

    public ArticleRepository(IMongoDbContext context)
    {
        _collection = context.GetCollection<Article>(CollectionName);
    }

    private static FilterDefinition<Article> BuildFilter(string? source, string? search)
    {
        var filters = new List<FilterDefinition<Article>>();

        if (!string.IsNullOrWhiteSpace(source))
        {
            filters.Add(Builders<Article>.Filter.Eq(a => a.Source, source));
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var escaped = Regex.Escape(search.Trim());
            var regex = new BsonRegularExpression(escaped, "i");
            filters.Add(Builders<Article>.Filter.Or(
                Builders<Article>.Filter.Regex(a => a.Title, regex),
                Builders<Article>.Filter.Regex(a => a.Excerpt, regex)));
        }

        return filters.Count == 0 ? FilterDefinition<Article>.Empty : Builders<Article>.Filter.And(filters);
    }

    public async Task<List<Article>> GetPagedAsync(string? source, string? search, int page, int pageSize) =>
        await _collection.Find(BuildFilter(source, search))
            .SortByDescending(a => a.PublishedAt)
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();

    public Task<Article?> GetByIdAsync(string id) =>
        _collection.Find(a => a.Id == id).FirstOrDefaultAsync()!;

    public Task<long> CountAsync(string? source, string? search) =>
        _collection.CountDocumentsAsync(BuildFilter(source, search));

    public Task<long> CountAsync() => _collection.CountDocumentsAsync(FilterDefinition<Article>.Empty);

    public Task InsertAsync(Article article) => _collection.InsertOneAsync(article);

    public Task InsertManyAsync(IEnumerable<Article> articles) => _collection.InsertManyAsync(articles);

    public async Task<bool> ReplaceAsync(string id, Article article)
    {
        var result = await _collection.ReplaceOneAsync(a => a.Id == id, article);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _collection.DeleteOneAsync(a => a.Id == id);
        return result.DeletedCount > 0;
    }
}
