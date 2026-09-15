using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PortfolioApi.Modules.SocialLinks.Entities;

public class SocialLink
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    public string Platform { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string? Handle { get; set; }
    public int Order { get; set; }
}
