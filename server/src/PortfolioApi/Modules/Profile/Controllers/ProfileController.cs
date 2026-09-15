using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Common.Responses;
using PortfolioApi.Modules.Profile.Dtos;
using PortfolioApi.Modules.Profile.Interfaces;

namespace PortfolioApi.Modules.Profile.Controllers;

[ApiController]
[Route("api/profile")]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<DeveloperProfileDto>>> Get()
    {
        var result = await _profileService.GetProfileAsync();
        return Ok(ApiResponse<DeveloperProfileDto>.Ok(result));
    }
}
