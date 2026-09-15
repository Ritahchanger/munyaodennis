namespace PortfolioApi.Modules.SocialLinks.Dtos;

public class CreateSocialLinkDto
{
    public string Platform { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string? Handle { get; set; }
    public int Order { get; set; }
}
