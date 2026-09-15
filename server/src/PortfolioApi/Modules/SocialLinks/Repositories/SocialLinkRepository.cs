using MongoDB.Driver;
using PortfolioApi.Data;
using PortfolioApi.Modules.SocialLinks.Entities;
using PortfolioApi.Modules.SocialLinks.Interfaces;

namespace PortfolioApi.Modules.SocialLinks.Repositories;

public class SocialLinkRepository : ISocialLinkRepository
{
    private const string CollectionName = "social_links";
    private readonly IMongoCollection<SocialLink> _collection;

    public SocialLinkRepository(IMongoDbContext context)
    {
        _collection = context.GetCollection<SocialLink>(CollectionName);
    }

    public async Task<List<SocialLink>> GetAllAsync() =>
        await _collection.Find(FilterDefinition<SocialLink>.Empty)
            .SortBy(l => l.Order)
            .ToListAsync();

    public Task<SocialLink?> GetByIdAsync(string id) =>
        _collection.Find(l => l.Id == id).FirstOrDefaultAsync()!;

    public Task<long> CountAsync() => _collection.CountDocumentsAsync(FilterDefinition<SocialLink>.Empty);

    public Task InsertAsync(SocialLink link) => _collection.InsertOneAsync(link);

    public Task InsertManyAsync(IEnumerable<SocialLink> links) => _collection.InsertManyAsync(links);

    public async Task<bool> ReplaceAsync(string id, SocialLink link)
    {
        var result = await _collection.ReplaceOneAsync(l => l.Id == id, link);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _collection.DeleteOneAsync(l => l.Id == id);
        return result.DeletedCount > 0;
    }
}
