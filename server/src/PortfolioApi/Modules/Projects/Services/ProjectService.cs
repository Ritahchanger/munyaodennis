using PortfolioApi.Common.Exceptions;
using PortfolioApi.Modules.Projects.Dtos;
using PortfolioApi.Modules.Projects.Entities;
using PortfolioApi.Modules.Projects.Interfaces;

namespace PortfolioApi.Modules.Projects.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _repository;

    public ProjectService(IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ProjectDto>> GetAllAsync()
    {
        var projects = await _repository.GetAllAsync();
        return projects.Select(ToDto).ToList();
    }

    public async Task<ProjectDto> GetBySlugAsync(string slug)
    {
        var project = await _repository.GetBySlugAsync(slug)
            ?? throw new NotFoundException($"Project '{slug}' was not found.");
        return ToDto(project);
    }

    public async Task<ProjectDto> CreateAsync(CreateProjectDto dto)
    {
        var project = new Project
        {
            Slug = dto.Slug,
            Name = dto.Name,
            Description = dto.Description,
            TechStack = dto.TechStack,
            Highlights = dto.Highlights,
            RepoUrl = dto.RepoUrl,
            LiveUrl = dto.LiveUrl,
            ImageUrl = dto.ImageUrl,
            Status = dto.Status,
            Featured = dto.Featured,
            Order = dto.Order,
        };

        await _repository.InsertAsync(project);
        return ToDto(project);
    }

    public async Task<ProjectDto> UpdateAsync(string id, UpdateProjectDto dto)
    {
        var existing = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Project not found.");

        existing.Name = dto.Name;
        existing.Description = dto.Description;
        existing.TechStack = dto.TechStack;
        existing.Highlights = dto.Highlights;
        existing.RepoUrl = dto.RepoUrl;
        existing.LiveUrl = dto.LiveUrl;
        existing.ImageUrl = dto.ImageUrl;
        existing.Status = dto.Status;
        existing.Featured = dto.Featured;
        existing.Order = dto.Order;

        await _repository.ReplaceAsync(id, existing);
        return ToDto(existing);
    }

    public async Task DeleteAsync(string id)
    {
        var deleted = await _repository.DeleteAsync(id);
        if (!deleted)
        {
            throw new NotFoundException("Project not found.");
        }
    }

    private static ProjectDto ToDto(Project project) => new()
    {
        Id = project.Id,
        Slug = project.Slug,
        Name = project.Name,
        Description = project.Description,
        TechStack = project.TechStack,
        Highlights = project.Highlights,
        RepoUrl = project.RepoUrl,
        LiveUrl = project.LiveUrl,
        ImageUrl = project.ImageUrl,
        Status = project.Status,
        Featured = project.Featured,
        Order = project.Order,
    };
}
