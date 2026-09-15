using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Common.Requests;
using PortfolioApi.Common.Responses;
using PortfolioApi.Modules.Works.Dtos;
using PortfolioApi.Modules.Works.Interfaces;

namespace PortfolioApi.Modules.Works.Controllers;

[ApiController]
[Route("api/works")]
public class WorksController : ControllerBase
{
    private readonly IWorkService _workService;

    public WorksController(IWorkService workService)
    {
        _workService = workService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedResult<WorkDto>>>> GetAll(
        [FromQuery] string? category,
        [FromQuery] string? search,
        [FromQuery] PaginationQuery query)
    {
        var result = await _workService.GetPagedAsync(category, search, query.Page, query.PageSize);
        return Ok(ApiResponse<PagedResult<WorkDto>>.Ok(result));
    }

    [HttpGet("categories")]
    public async Task<ActionResult<ApiResponse<List<string>>>> GetCategories()
    {
        var result = await _workService.GetCategoriesAsync();
        return Ok(ApiResponse<List<string>>.Ok(result));
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ApiResponse<WorkDto>>> Create([FromBody] CreateWorkDto dto)
    {
        var result = await _workService.CreateAsync(dto);
        return StatusCode(StatusCodes.Status201Created, ApiResponse<WorkDto>.Ok(result, "Work created."));
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<WorkDto>>> Update(string id, [FromBody] UpdateWorkDto dto)
    {
        var result = await _workService.UpdateAsync(id, dto);
        return Ok(ApiResponse<WorkDto>.Ok(result, "Work updated."));
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        await _workService.DeleteAsync(id);
        return NoContent();
    }
}
