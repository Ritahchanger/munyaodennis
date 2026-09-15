using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Common.Responses;
using PortfolioApi.Modules.Projects.Dtos;
using PortfolioApi.Modules.Projects.Interfaces;

namespace PortfolioApi.Modules.Projects.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<ProjectDto>>>> GetAll()
    {
        var result = await _projectService.GetAllAsync();
        return Ok(ApiResponse<List<ProjectDto>>.Ok(result));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> GetBySlug(string slug)
    {
        var result = await _projectService.GetBySlugAsync(slug);
        return Ok(ApiResponse<ProjectDto>.Ok(result));
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> Create([FromBody] CreateProjectDto dto)
    {
        var result = await _projectService.CreateAsync(dto);
        return StatusCode(StatusCodes.Status201Created, ApiResponse<ProjectDto>.Ok(result, "Project created."));
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<ProjectDto>>> Update(string id, [FromBody] UpdateProjectDto dto)
    {
        var result = await _projectService.UpdateAsync(id, dto);
        return Ok(ApiResponse<ProjectDto>.Ok(result, "Project updated."));
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        await _projectService.DeleteAsync(id);
        return NoContent();
    }
}
