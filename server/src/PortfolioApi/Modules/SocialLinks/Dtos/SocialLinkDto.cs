namespace PortfolioApi.Modules.SocialLinks.Dtos;

public class SocialLinkDto
{
    public string Id { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string? Handle { get; set; }
    public int Order { get; set; }
}
