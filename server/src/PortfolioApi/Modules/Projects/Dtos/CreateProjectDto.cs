using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Modules.Projects.Dtos;

public class CreateProjectDto
{
    [Required]
    public string Slug { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    public List<string> TechStack { get; set; } = new();
    public List<string> Highlights { get; set; } = new();
    public string? RepoUrl { get; set; }
    public string? LiveUrl { get; set; }
    public string? ImageUrl { get; set; }
    public string Status { get; set; } = "completed";
    public bool Featured { get; set; }
    public int Order { get; set; }
}
