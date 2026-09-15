using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Common.Responses;
using PortfolioApi.Modules.SocialLinks.Dtos;
using PortfolioApi.Modules.SocialLinks.Interfaces;

namespace PortfolioApi.Modules.SocialLinks.Controllers;

[ApiController]
[Route("api/social-links")]
public class SocialLinksController : ControllerBase
{
    private readonly ISocialLinkService _socialLinkService;

    public SocialLinksController(ISocialLinkService socialLinkService)
    {
        _socialLinkService = socialLinkService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<SocialLinkDto>>>> GetAll()
    {
        var result = await _socialLinkService.GetAllAsync();
        return Ok(ApiResponse<List<SocialLinkDto>>.Ok(result));
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ApiResponse<SocialLinkDto>>> Create([FromBody] CreateSocialLinkDto dto)
    {
        var result = await _socialLinkService.CreateAsync(dto);
        return StatusCode(StatusCodes.Status201Created, ApiResponse<SocialLinkDto>.Ok(result, "Social link created."));
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<SocialLinkDto>>> Update(string id, [FromBody] UpdateSocialLinkDto dto)
    {
        var result = await _socialLinkService.UpdateAsync(id, dto);
        return Ok(ApiResponse<SocialLinkDto>.Ok(result, "Social link updated."));
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        await _socialLinkService.DeleteAsync(id);
        return NoContent();
    }
}
