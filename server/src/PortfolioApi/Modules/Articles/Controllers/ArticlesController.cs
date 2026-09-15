using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Common.Requests;
using PortfolioApi.Common.Responses;
using PortfolioApi.Modules.Articles.Dtos;
using PortfolioApi.Modules.Articles.Interfaces;

namespace PortfolioApi.Modules.Articles.Controllers;

[ApiController]
[Route("api/articles")]
public class ArticlesController : ControllerBase
{
    private readonly IArticleService _articleService;

    public ArticlesController(IArticleService articleService)
    {
        _articleService = articleService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedResult<ArticleDto>>>> GetAll(
        [FromQuery] string? source,
        [FromQuery] string? search,
        [FromQuery] PaginationQuery query)
    {
        var result = await _articleService.GetPagedAsync(source, search, query.Page, query.PageSize);
        return Ok(ApiResponse<PagedResult<ArticleDto>>.Ok(result));
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ApiResponse<ArticleDto>>> Create([FromBody] CreateArticleDto dto)
    {
        var result = await _articleService.CreateAsync(dto);
        return StatusCode(StatusCodes.Status201Created, ApiResponse<ArticleDto>.Ok(result, "Article created."));
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<ArticleDto>>> Update(string id, [FromBody] UpdateArticleDto dto)
    {
        var result = await _articleService.UpdateAsync(id, dto);
        return Ok(ApiResponse<ArticleDto>.Ok(result, "Article updated."));
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        await _articleService.DeleteAsync(id);
        return NoContent();
    }
}
