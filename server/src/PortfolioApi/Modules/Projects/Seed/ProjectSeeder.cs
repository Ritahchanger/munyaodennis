using PortfolioApi.Data.Seed;
using PortfolioApi.Modules.Projects.Entities;
using PortfolioApi.Modules.Projects.Interfaces;

namespace PortfolioApi.Modules.Projects.Seed;

public class ProjectSeeder : IDataSeeder
{
    private readonly IProjectRepository _repository;

    public ProjectSeeder(IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task SeedAsync()
    {
        if (await _repository.CountAsync() > 0)
        {
            return;
        }

        var projects = new List<Project>
        {
            new()
            {
                Slug = "bmwriters",
                Name = "Bmwriters",
                Description = "A freelance writing marketplace (\"Writers Clients Unifier\") connecting clients, writers, and admins through a full bidding-to-payout assignment lifecycle — live in production at bmwriters.com.",
                TechStack = new() { "React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Redis", "Socket.io", "Firebase Storage", "JWT", "Tailwind CSS" },
                Highlights = new()
                {
                    "Launched to production with 300+ successful project transactions in 6 months.",
                    "Seven-stage assignment lifecycle (Not Bid → Bid → In Progress → In Review → In Revision → Completed/Cancelled) with real-time status tracking.",
                    "Real-time bidding, notifications, and multi-user chat via Socket.io, lifting user engagement by 40%.",
                    "Redis-backed session management and caching boosted backend performance by 60%.",
                    "JWT auth with role-based access control across clients, writers, and admins cut unauthorized access incidents by 95%.",
                    "Automated financial system: instant balance updates, late-submission penalty calculation, and a streamlined withdrawal pipeline.",
                    "Firebase Storage-backed file management with version tracking and role-based access.",
                },
                RepoUrl = "https://github.com/Ritahchanger/writers_clients_unifier",
                LiveUrl = "https://www.bmwriters.com/login",
                Status = "completed",
                Featured = true,
                Order = 1,
            },
            new()
            {
                Slug = "kazibuddy",
                Name = "Kazibuddy",
                Description = "A job-matching platform connecting people across Kenyan slums — especially unemployed youth — with low-end, informal jobs (cleaning, plumbing/shower repair, laundry, watchmen, and more). Built while leading the frontend/backend team at Tafakari.",
                TechStack = new() { "React", "Django", "WebSocket", "JWT", "Google OAuth" },
                Highlights = new()
                {
                    "Designed and built the primary React interface for worker and employer profile flows and job search/browse screens, optimized for a low-digital-literacy user base.",
                    "Implemented WebSocket-based real-time messaging so workers and employers could communicate directly within the platform.",
                    "Built the authentication flow (JWT-based login plus Google OAuth) with secure token handling between the React frontend and Django backend.",
                    "Led a small cross-functional frontend/backend team — reviewing code, unblocking engineers, and keeping API contracts and release timelines aligned.",
                },
                LiveUrl = "https://kazibuddy.tech/",
                Status = "completed",
                Featured = true,
                Order = 2,
            },
            new()
            {
                Slug = "orbit-retail-platform",
                Name = "Orbit — Multi-Store Retail Management Platform",
                Description = "A modular retail management system spanning a customer-facing frontend, an Electron desktop admin app, and a REST API for multi-location retail operations.",
                TechStack = new() { "React", "Node.js", "Express", "MongoDB", "Electron" },
                Highlights = new()
                {
                    "React/Vite customer-facing frontend, Electron desktop admin app, and Node.js/Express REST API backed by MongoDB.",
                    "Real-time, cross-store inventory tracking with automated low-stock alerts.",
                    "Integrated M-Pesa payment processing with automated transaction reconciliation.",
                    "Four-tier RBAC (Cashier, Manager, Admin, Superadmin) with granular route-level permission enforcement across 10+ admin routes.",
                },
                Status = "in-progress",
                Featured = true,
                Order = 3,
            },
            new()
            {
                Slug = "utube-downloader",
                Name = "Utube Downloader",
                Description = "A high-performance YouTube downloader with a Flask backend and a ReactJS Vite frontend.",
                TechStack = new() { "ReactJS", "Flask" },
                Highlights = new()
                {
                    "~50% faster download speeds compared to existing solutions.",
                    "Integrated yt-dlp in Python to support multi-resolution downloads (1080p, 720p+).",
                    "Responsive UI with Tailwind CSS and React hooks, ~30% faster load time than typical downloaders.",
                },
                Status = "completed",
                Featured = true,
                Order = 4,
            },
            new()
            {
                Slug = "javascript-playground",
                Name = "JavaScript Playground",
                Description = "A structured, continuously evolving collection of JavaScript, TypeScript, React, and Node.js implementations mastering software engineering fundamentals and system design.",
                TechStack = new() { "JavaScript", "TypeScript", "React", "Node.js" },
                Highlights = new()
                {
                    "Algorithms & data structures practice via LeetCode, Amazon, and Codility challenge patterns.",
                    "Frontend engineering with React hooks, Context API, Redux, and advanced state management.",
                    "Backend fundamentals: Express APIs, OAuth/GitHub/Google auth, Redis caching, Prisma ORM.",
                },
                RepoUrl = "https://github.com/Ritahchanger/Javascript-playground",
                Status = "completed",
                Featured = false,
                Order = 5,
            },
            new()
            {
                Slug = "system-design-guide",
                Name = "System Design Guide",
                Description = "An extensive repository exploring end-to-end system design across API gateways, caching, database design, scalability, security, and microservices.",
                TechStack = new() { "System Design", "Architecture", "Microservices" },
                Highlights = new()
                {
                    "Structured 12-week learning roadmap from fundamentals to advanced design patterns.",
                    "Real-world case studies: URL shortener, video streaming, social feed, ride-sharing, chat systems.",
                    "Interview preparation framework covering estimation, trade-offs, bottlenecks, and architecture diagrams.",
                },
                RepoUrl = "https://github.com/Ritahchanger/system_design",
                Status = "completed",
                Featured = false,
                Order = 6,
            },
        };

        await _repository.InsertManyAsync(projects);
    }
}
