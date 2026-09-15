using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PortfolioApi.Common.Options;

namespace PortfolioApi.Data;

public class MongoDbContext : IMongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IOptions<MongoDbOptions> options)
    {
        var client = new MongoClient(options.Value.ConnectionString);
        _database = client.GetDatabase(options.Value.DatabaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string name) => _database.GetCollection<T>(name);
}
