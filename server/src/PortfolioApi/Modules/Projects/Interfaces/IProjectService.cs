using PortfolioApi.Modules.Projects.Dtos;

namespace PortfolioApi.Modules.Projects.Interfaces;

public interface IProjectService
{
    Task<List<ProjectDto>> GetAllAsync();
    Task<ProjectDto> GetBySlugAsync(string slug);
    Task<ProjectDto> CreateAsync(CreateProjectDto dto);
    Task<ProjectDto> UpdateAsync(string id, UpdateProjectDto dto);
    Task DeleteAsync(string id);
}
