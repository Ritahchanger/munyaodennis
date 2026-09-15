using PortfolioApi.Common.Exceptions;
using PortfolioApi.Modules.Profile.Dtos;
using PortfolioApi.Modules.Profile.Interfaces;

namespace PortfolioApi.Modules.Profile.Services;

public class ProfileService : IProfileService
{
    private readonly IProfileRepository _repository;

    public ProfileService(IProfileRepository repository)
    {
        _repository = repository;
    }

    public async Task<DeveloperProfileDto> GetProfileAsync()
    {
        var profile = await _repository.GetAsync()
            ?? throw new NotFoundException("Developer profile has not been configured yet.");

        return new DeveloperProfileDto
        {
            FullName = profile.FullName,
            Title = profile.Title,
            Location = profile.Location,
            Summary = profile.Summary,
            Email = profile.Email,
            Phone = profile.Phone,
            Skills = profile.Skills.Select(s => new SkillGroupDto { Category = s.Category, Items = s.Items }).ToList(),
            Experience = profile.Experience.Select(e => new ExperienceEntryDto
            {
                Company = e.Company,
                Role = e.Role,
                Period = e.Period,
                Location = e.Location,
                EmploymentType = e.EmploymentType,
                Url = e.Url,
                Current = e.Current,
                Highlights = e.Highlights,
            }).ToList(),
            Education = profile.Education.Select(e => new EducationEntryDto
            {
                Institution = e.Institution,
                Program = e.Program,
                Period = e.Period,
                Details = e.Details,
            }).ToList(),
            Achievements = profile.Achievements.Select(a => new AchievementDto
            {
                Title = a.Title,
                Period = a.Period,
                Description = a.Description,
            }).ToList(),
        };
    }
}
