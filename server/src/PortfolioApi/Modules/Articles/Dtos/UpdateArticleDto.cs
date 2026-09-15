namespace PortfolioApi.Modules.Articles.Dtos;

public class UpdateArticleDto
{
    public string Source { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public DateTime PublishedAt { get; set; }
    public List<string> Tags { get; set; } = new();
}
