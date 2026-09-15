using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PortfolioApi.Modules.Profile.Entities;

public class SkillGroup
{
    public string Category { get; set; } = string.Empty;
    public List<string> Items { get; set; } = new();
}

public class ExperienceEntry
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

public class EducationEntry
{
    public string Institution { get; set; } = string.Empty;
    public string Program { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public List<string> Details { get; set; } = new();
}

public class Achievement
{
    public string Title { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class DeveloperProfile
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;

    public List<SkillGroup> Skills { get; set; } = new();
    public List<ExperienceEntry> Experience { get; set; } = new();
    public List<EducationEntry> Education { get; set; } = new();
    public List<Achievement> Achievements { get; set; } = new();
}
