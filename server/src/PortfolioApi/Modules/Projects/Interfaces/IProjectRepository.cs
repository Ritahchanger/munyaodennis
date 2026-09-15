using PortfolioApi.Modules.Projects.Entities;

namespace PortfolioApi.Modules.Projects.Interfaces;

public interface IProjectRepository
{
    Task<List<Project>> GetAllAsync();
    Task<Project?> GetBySlugAsync(string slug);
    Task<Project?> GetByIdAsync(string id);
    Task<long> CountAsync();
    Task InsertAsync(Project project);
    Task InsertManyAsync(IEnumerable<Project> projects);
    Task<bool> ReplaceAsync(string id, Project project);
    Task<bool> DeleteAsync(string id);
}
