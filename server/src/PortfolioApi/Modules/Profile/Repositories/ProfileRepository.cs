using MongoDB.Driver;
using PortfolioApi.Data;
using PortfolioApi.Modules.Profile.Entities;
using PortfolioApi.Modules.Profile.Interfaces;

namespace PortfolioApi.Modules.Profile.Repositories;

public class ProfileRepository : IProfileRepository
{
    private const string CollectionName = "profile";
    private readonly IMongoCollection<DeveloperProfile> _collection;

    public ProfileRepository(IMongoDbContext context)
    {
        _collection = context.GetCollection<DeveloperProfile>(CollectionName);
    }

    public Task<DeveloperProfile?> GetAsync() =>
        _collection.Find(FilterDefinition<DeveloperProfile>.Empty).FirstOrDefaultAsync()!;

    public Task<long> CountAsync() => _collection.CountDocumentsAsync(FilterDefinition<DeveloperProfile>.Empty);

    public Task InsertAsync(DeveloperProfile profile) => _collection.InsertOneAsync(profile);
}
