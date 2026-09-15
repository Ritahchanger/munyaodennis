using MongoDB.Driver;
using PortfolioApi.Data;
using PortfolioApi.Modules.Auth.Entities;
using PortfolioApi.Modules.Auth.Interfaces;

namespace PortfolioApi.Modules.Auth.Repositories;

public class UserRepository : IUserRepository
{
    private const string CollectionName = "users";
    private readonly IMongoCollection<User> _collection;

    public UserRepository(IMongoDbContext context)
    {
        _collection = context.GetCollection<User>(CollectionName);
    }

    public Task<User?> GetByEmailAsync(string email) =>
        _collection.Find(u => u.Email == email).FirstOrDefaultAsync()!;

    public Task<User?> GetByIdAsync(string id) =>
        _collection.Find(u => u.Id == id).FirstOrDefaultAsync()!;

    public Task<long> CountAsync() => _collection.CountDocumentsAsync(FilterDefinition<User>.Empty);

    public Task InsertAsync(User user) => _collection.InsertOneAsync(user);

    public async Task<bool> UpdatePasswordHashAsync(string id, string passwordHash)
    {
        var update = Builders<User>.Update.Set(u => u.PasswordHash, passwordHash);
        var result = await _collection.UpdateOneAsync(u => u.Id == id, update);
        return result.ModifiedCount > 0;
    }
}
