using PortfolioApi.Data.Seed;
using PortfolioApi.Modules.Profile.Entities;
using PortfolioApi.Modules.Profile.Interfaces;

namespace PortfolioApi.Modules.Profile.Seed;

public class ProfileSeeder : IDataSeeder
{
    private readonly IProfileRepository _repository;

    public ProfileSeeder(IProfileRepository repository)
    {
        _repository = repository;
    }

    public async Task SeedAsync()
    {
        if (await _repository.CountAsync() > 0)
        {
            return;
        }

        var profile = new DeveloperProfile
        {
            FullName = "Dennis Peter Munyao",
            Title = "Software Engineer",
            Location = "Nairobi, Kenya",
            Email = "peterdennis573@gmail.com",
            Phone = "+254-113-174-493",
            Summary = "Skilled software engineer with 4+ years of experience in full-stack development using Python, JavaScript, Java, and TypeScript. Proficient in ReactJS, Angular, Next.js, AI agents, and Django. Strong background in building RESTful APIs, microservices, and real-time applications with WebRTC. Focused on writing clean, efficient code and delivering scalable web solutions.",
            Skills = new List<SkillGroup>
            {
                new() { Category = "Backend Development", Items = new() { "Python", "Java", ".NET", "NestJS", "Node.js", "Django", "REST", "GraphQL", "WebRTC" } },
                new() { Category = "Frontend Development", Items = new() { "ReactJS", "Redux", "Next.js", "Tailwind", "Angular", "JavaScript", "TypeScript" } },
                new() { Category = "AI / ML", Items = new() { "PyTorch", "TensorFlow", "LangChain", "LlamaIndex", "AutoGen", "CrewAI" } },
                new() { Category = "Data Engineering", Items = new() { "Apache Spark", "Kafka", "Data pipelines" } },
                new() { Category = "DevOps", Items = new() { "AWS (EC2, S3, Lambda, RDS)", "CI/CD", "GitHub Actions", "Docker" } },
            },
            Experience = new List<ExperienceEntry>
            {
                new()
                {
                    Company = "Trigyn Technologies (IOM / UN)",
                    Role = "Senior Frontend/UI Consultant",
                    Period = "Apr 2026 – Current",
                    Location = "Remote, Kenya",
                    Current = true,
                    Highlights = new()
                    {
                        "Lead frontend architecture and implementation for React and TypeScript applications, ensuring scalability, maintainability, and alignment with backend services.",
                        "Develop complex, reusable UI components and design systems, supporting both rapid prototyping and production-grade interfaces.",
                        "Define and enforce UI engineering standards, including component design, state management, and frontend layering.",
                        "Implement frontend unit and integration testing strategies within CI/CD pipelines, reducing defects and improving code quality.",
                    },
                },
                new()
                {
                    Company = "Tafakari",
                    Role = "Full-Stack Developer & Team Lead",
                    Period = "Apr 2025 – Current",
                    Location = "Remote",
                    Url = "https://kazibuddy.tech/",
                    Current = true,
                    Highlights = new()
                    {
                        "Designed and built the primary React interface for a job-matching platform, including worker and employer profile flows and job search/browse screens.",
                        "Implemented WebSocket-based real-time messaging so workers and employers could communicate directly within the platform.",
                        "Built the authentication flow (JWT-based login plus Google OAuth), including secure token handling between the frontend and Django backend.",
                        "Led a small frontend/backend team, reviewing code, unblocking engineers, and keeping cross-team work in sync as the product evolved.",
                    },
                },
                new()
                {
                    Company = "Amband Limited",
                    Role = "Software Development & Product Engineering",
                    Period = "Aug 2025 – Apr 2026",
                    Location = "Nairobi, Kenya",
                    EmploymentType = "Full-time",
                    Current = false,
                    Highlights = new()
                    {
                        "Developed and maintained scalable full-stack applications using Node.js, NestJS, Python, React, MongoDB, and PostgreSQL.",
                        "Deployed and managed applications on AWS (EC2, S3, Lambda, RDS) and implemented CI/CD pipelines with GitHub Actions and Docker.",
                        "Built and integrated RESTful and GraphQL APIs for seamless client–server communication.",
                        "Designed and optimized PostgreSQL and MongoDB databases for performance, scalability, and data integrity.",
                    },
                },
                new()
                {
                    Company = "HekoPay Limited",
                    Role = "Fullstack Developer",
                    Period = "May 2025 – Aug 2025",
                    Location = "Remote",
                    Current = false,
                    Highlights = new()
                    {
                        "Designed and developed RESTful APIs using Node.js and Express for a secure, scalable digital wallet system.",
                        "Engineered real-time transaction processing systems with full wallet audit trails.",
                        "Led development of features enabling cashback on transaction fees, driving user engagement.",
                        "Implemented seamless multi-currency support (KES, NGN, ZAR) and cross-border compliance protocols.",
                    },
                },
            },
            Education = new List<EducationEntry>
            {
                new()
                {
                    Institution = "Meru University of Science & Technology",
                    Program = "BSc Computer Science — Second Class Honors, Upper Division",
                    Period = "Aug 2021 – Oct 2025",
                    Details = new()
                    {
                        "Specialized in Software Engineering, with a focus on scalable frontend architecture and modern JavaScript frameworks.",
                        "Built a solid foundation spanning software engineering fundamentals, algorithms, and full-stack application development.",
                    },
                },
                new()
                {
                    Institution = "Sankhyana Consultancy Services Pvt. Ltd.",
                    Program = "Generative AI Certificate",
                    Period = "Jun 2026 – Aug 2026",
                    Details = new()
                    {
                        "Evaluated and applied modern LLM system design patterns, including agentic orchestration with LangGraph and Retrieval-Augmented Generation (RAG) architectures.",
                        "Assessed trade-offs in designing stateful, multi-step AI agent workflows versus traditional request-response LLM integrations.",
                    },
                },
                new()
                {
                    Institution = "Emobilis Institute of Technology",
                    Program = "Web Development Certificate",
                    Period = "Oct 2024 – Aug 2025",
                    Details = new()
                    {
                        "Built practical experience with Django's architecture, including views, templates, middleware, and authentication systems.",
                    },
                },
            },
            Achievements = new List<Achievement>
            {
                new()
                {
                    Title = "Safaricom 2024 Summit Hackathon — 1st Place",
                    Period = "Oct 2024",
                    Description = "Achieved 1st place by developing a solution using Fully Homomorphic Encryption (FHE) to enable LLMs to process encrypted data without compromising user privacy, addressing sensitive-data exposure concerns in AI-powered platforms.",
                },
                new()
                {
                    Title = "Web Development Lead — Meru University",
                    Period = "May 2024 – May 2025",
                    Description = "Appointed lead coordinator of web development initiatives, guiding a team of student developers and organizing workshops and hackathons to mentor peers on modern web practices.",
                },
            },
        };

        await _repository.InsertAsync(profile);
    }
}
