using PortfolioApi.Data.Seed;
using PortfolioApi.Modules.SocialLinks.Entities;
using PortfolioApi.Modules.SocialLinks.Interfaces;

namespace PortfolioApi.Modules.SocialLinks.Seed;

public class SocialLinkSeeder : IDataSeeder
{
    private readonly ISocialLinkRepository _repository;

    public SocialLinkSeeder(ISocialLinkRepository repository)
    {
        _repository = repository;
    }

    public async Task SeedAsync()
    {
        if (await _repository.CountAsync() > 0)
        {
            return;
        }

        var links = new List<SocialLink>
        {
            new() { Platform = "whatsapp", Label = "WhatsApp", Url = "https://wa.me/254113174493", Handle = "254113174493", Order = 1 },
            new() { Platform = "linkedin", Label = "LinkedIn", Url = "https://www.linkedin.com/in/munyao-dennis/", Handle = "munyao-dennis", Order = 2 },
            new() { Platform = "github", Label = "GitHub", Url = "https://github.com/ritahchanger", Handle = "ritahchanger", Order = 3 },
            new() { Platform = "medium", Label = "Medium", Url = "https://medium.com/@codewithmunyao", Handle = "codewithmunyao", Order = 4 },
            new() { Platform = "substack", Label = "Substack", Url = "https://substack.com/@ritahchanger?r=5b81vd&utm_campaign=profile&utm_medium=profile-page", Handle = "ritahchanger", Order = 5 },
            new() { Platform = "devto", Label = "Dev.to", Url = "https://dev.to/codewithmunyao", Handle = "codewithmunyao", Order = 6 },
            new() { Platform = "youtube", Label = "YouTube", Url = "https://www.youtube.com/@Dennispetermunyao", Handle = "Dennispetermunyao", Order = 7 },
            new() { Platform = "tiktok", Label = "TikTok", Url = "https://www.tiktok.com/@codewithmunyao", Handle = "codewithmunyao", Order = 8 },
        };

        await _repository.InsertManyAsync(links);
    }
}
