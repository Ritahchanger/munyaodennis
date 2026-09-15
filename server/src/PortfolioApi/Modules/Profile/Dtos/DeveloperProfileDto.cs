namespace PortfolioApi.Modules.Profile.Dtos;

public class SkillGroupDto
{
    public string Category { get; set; } = string.Empty;
    public List<string> Items { get; set; } = new();
}

public class ExperienceEntryDto
{
    public string Company { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string? EmploymentType { get; set; }
    public string? Url { get; set; }
    public bool Current { get; set; }
    public List<string> Highlights { get; set; } = new();
}

public class EducationEntryDto
{
    public string Institution { get; set; } = string.Empty;
    public string Program { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public List<string> Details { get; set; } = new();
}

public class AchievementDto
{
    public string Title { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class DeveloperProfileDto
{
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;

    public List<SkillGroupDto> Skills { get; set; } = new();
    public List<ExperienceEntryDto> Experience { get; set; } = new();
    public List<EducationEntryDto> Education { get; set; } = new();
    public List<AchievementDto> Achievements { get; set; } = new();
}
