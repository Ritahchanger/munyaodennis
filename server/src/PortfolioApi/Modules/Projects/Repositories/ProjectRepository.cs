using MongoDB.Driver;
using PortfolioApi.Data;
using PortfolioApi.Modules.Projects.Entities;
using PortfolioApi.Modules.Projects.Interfaces;

namespace PortfolioApi.Modules.Projects.Repositories;

public class ProjectRepository : IProjectRepository
{
    private const string CollectionName = "projects";
    private readonly IMongoCollection<Project> _collection;

    public ProjectRepository(IMongoDbContext context)
    {
        _collection = context.GetCollection<Project>(CollectionName);
    }

    public async Task<List<Project>> GetAllAsync() =>
        await _collection.Find(FilterDefinition<Project>.Empty)
            .SortBy(p => p.Order)
            .ToListAsync();

    public Task<Project?> GetBySlugAsync(string slug) =>
        _collection.Find(p => p.Slug == slug).FirstOrDefaultAsync()!;

    public Task<Project?> GetByIdAsync(string id) =>
        _collection.Find(p => p.Id == id).FirstOrDefaultAsync()!;

    public Task<long> CountAsync() => _collection.CountDocumentsAsync(FilterDefinition<Project>.Empty);

    public Task InsertAsync(Project project) => _collection.InsertOneAsync(project);

    public Task InsertManyAsync(IEnumerable<Project> projects) => _collection.InsertManyAsync(projects);

    public async Task<bool> ReplaceAsync(string id, Project project)
    {
        var result = await _collection.ReplaceOneAsync(p => p.Id == id, project);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _collection.DeleteOneAsync(p => p.Id == id);
        return result.DeletedCount > 0;
    }
}
