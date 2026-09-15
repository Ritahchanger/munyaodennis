using PortfolioApi.Data.Seed;
using PortfolioApi.Modules.Articles.Entities;
using PortfolioApi.Modules.Articles.Interfaces;

namespace PortfolioApi.Modules.Articles.Seed;

/// <summary>
/// Seeds placeholder blog posts until the real Medium/Substack feeds are wired up.
/// </summary>
public class ArticleSeeder : IDataSeeder
{
    private readonly IArticleRepository _repository;

    public ArticleSeeder(IArticleRepository repository)
    {
        _repository = repository;
    }

    public async Task SeedAsync()
    {
        if (await _repository.CountAsync() > 0)
        {
            return;
        }

        var articles = new List<Article>
        {
            new()
            {
                Source = "medium",
                Title = "Designing Reusable React Component Systems for Enterprise UIs",
                Url = "https://medium.com/@add-your-handle/reusable-react-components-placeholder",
                Excerpt = "Placeholder post — notes on building scalable, reusable component libraries for large React/TypeScript applications.",
                PublishedAt = new DateTime(2026, 6, 12, 0, 0, 0, DateTimeKind.Utc),
                Tags = new() { "React", "TypeScript", "Design Systems" },
            },
            new()
            {
                Source = "medium",
                Title = "Real-Time Messaging with WebRTC: Lessons from Production",
                Url = "https://medium.com/@add-your-handle/webrtc-lessons-placeholder",
                Excerpt = "Placeholder post — practical patterns and pitfalls building real-time, WebRTC-based communication features.",
                PublishedAt = new DateTime(2026, 4, 3, 0, 0, 0, DateTimeKind.Utc),
                Tags = new() { "WebRTC", "Real-time", "Backend" },
            },
            new()
            {
                Source = "substack",
                Title = "A Developer's Field Notes on Agentic AI Systems",
                Url = "https://add-your-handle.substack.com/p/agentic-ai-field-notes-placeholder",
                Excerpt = "Placeholder post — exploring LangGraph, RAG pipelines, and multi-step agent workflows in production systems.",
                PublishedAt = new DateTime(2026, 7, 20, 0, 0, 0, DateTimeKind.Utc),
                Tags = new() { "AI Agents", "LangChain", "RAG" },
            },
            new()
            {
                Source = "substack",
                Title = "System Design Diaries: Scaling a Multi-Store Retail Platform",
                Url = "https://add-your-handle.substack.com/p/system-design-diaries-placeholder",
                Excerpt = "Placeholder post — architecture decisions behind building a modular, multi-tenant retail management system.",
                PublishedAt = new DateTime(2026, 2, 8, 0, 0, 0, DateTimeKind.Utc),
                Tags = new() { "System Design", "Architecture" },
            },
        };

        await _repository.InsertManyAsync(articles);
    }
}
