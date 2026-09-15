using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PortfolioApi.Modules.Auth.Entities;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "admin";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
