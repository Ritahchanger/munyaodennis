using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PortfolioApi.Modules.Articles.Entities;

public class Article
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    public string Source { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public DateTime PublishedAt { get; set; }
    public List<string> Tags { get; set; } = new();
}
