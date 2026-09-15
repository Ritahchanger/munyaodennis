using MongoDB.Driver;

namespace PortfolioApi.Data;

public interface IMongoDbContext
{
    IMongoCollection<T> GetCollection<T>(string name);
}
