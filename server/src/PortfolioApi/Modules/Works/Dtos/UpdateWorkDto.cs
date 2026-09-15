namespace PortfolioApi.Modules.Works.Dtos;

public class UpdateWorkDto
{
    public string Category { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public int Order { get; set; }
}
