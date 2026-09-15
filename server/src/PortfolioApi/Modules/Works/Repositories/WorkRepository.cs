using System.Text.RegularExpressions;
using MongoDB.Bson;
using MongoDB.Driver;
using PortfolioApi.Data;
using PortfolioApi.Modules.Works.Entities;
using PortfolioApi.Modules.Works.Interfaces;

namespace PortfolioApi.Modules.Works.Repositories;

public class WorkRepository : IWorkRepository
{
    private const string CollectionName = "works";
    private readonly IMongoCollection<Work> _collection;

    public WorkRepository(IMongoDbContext context)
    {
        _collection = context.GetCollection<Work>(CollectionName);
    }

    private static FilterDefinition<Work> BuildFilter(string? category, string? search)
    {
        var filters = new List<FilterDefinition<Work>>();

        if (!string.IsNullOrWhiteSpace(category))
        {
            filters.Add(Builders<Work>.Filter.Eq(w => w.Category, category));
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var escaped = Regex.Escape(search.Trim());
            filters.Add(Builders<Work>.Filter.Regex(w => w.Name, new BsonRegularExpression(escaped, "i")));
        }

        return filters.Count == 0 ? FilterDefinition<Work>.Empty : Builders<Work>.Filter.And(filters);
    }

    public async Task<List<Work>> GetPagedAsync(string? category, string? search, int page, int pageSize) =>
        await _collection.Find(BuildFilter(category, search))
            .SortBy(w => w.Order)
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();

    public Task<Work?> GetByIdAsync(string id) =>
        _collection.Find(w => w.Id == id).FirstOrDefaultAsync()!;

    public Task<long> CountAsync(string? category, string? search) =>
        _collection.CountDocumentsAsync(BuildFilter(category, search));

    public Task<long> CountAsync() => _collection.CountDocumentsAsync(FilterDefinition<Work>.Empty);

    public async Task<List<string>> GetDistinctCategoriesAsync()
    {
        var cursor = await _collection.DistinctAsync(w => w.Category, FilterDefinition<Work>.Empty);
        var categories = await cursor.ToListAsync();
        return categories.OrderBy(c => c).ToList();
    }

    public Task InsertAsync(Work work) => _collection.InsertOneAsync(work);

    public Task InsertManyAsync(IEnumerable<Work> works) => _collection.InsertManyAsync(works);

    public async Task<bool> ReplaceAsync(string id, Work work)
    {
        var result = await _collection.ReplaceOneAsync(w => w.Id == id, work);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _collection.DeleteOneAsync(w => w.Id == id);
        return result.DeletedCount > 0;
    }
}
