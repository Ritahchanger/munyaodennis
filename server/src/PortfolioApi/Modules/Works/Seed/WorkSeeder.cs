using PortfolioApi.Data.Seed;
using PortfolioApi.Modules.Works.Entities;
using PortfolioApi.Modules.Works.Interfaces;

namespace PortfolioApi.Modules.Works.Seed;

public class WorkSeeder : IDataSeeder
{
    private readonly IWorkRepository _repository;

    public WorkSeeder(IWorkRepository repository)
    {
        _repository = repository;
    }

    public async Task SeedAsync()
    {
        if (await _repository.CountAsync() > 0)
        {
            return;
        }

        var order = 0;
        Work Item(string category, string name, string url, string type) =>
            new() { Category = category, Name = name, Url = url, Type = type, Order = order++ };

        var works = new List<Work>
        {
            Item("System Design", "Architecture Patterns", "https://github.com/Ritahchanger/system_design/tree/main/01-architecture-patterns", "github"),
            Item("System Design", "Databases", "https://github.com/Ritahchanger/system_design/tree/main/02-databases", "github"),
            Item("System Design", "API Gateways", "https://github.com/Ritahchanger/system_design/tree/main/03-api-gateways", "github"),
            Item("System Design", "Caching", "https://github.com/Ritahchanger/system_design/tree/main/04-caching", "github"),
            Item("System Design", "Microservices", "https://github.com/Ritahchanger/system_design/tree/main/05-microservices", "github"),
            Item("System Design", "Scalability", "https://github.com/Ritahchanger/system_design/tree/main/06-scalability", "github"),
            Item("System Design", "Infrastructure", "https://github.com/Ritahchanger/system_design/tree/main/07-infrastructure", "github"),
            Item("System Design", "Observability", "https://github.com/Ritahchanger/system_design/tree/main/08-observability", "github"),
            Item("System Design", "Security", "https://github.com/Ritahchanger/system_design/tree/main/09-security", "github"),
            Item("System Design", "Case Studies", "https://github.com/Ritahchanger/system_design/tree/main/10-case-studies", "github"),
            Item("System Design", "Interview Preparation", "https://github.com/Ritahchanger/system_design/tree/main/11-interviews", "github"),
            Item("Interviews", "JavaScript Masterpiece", "https://github.com/Ritahchanger/Javascript-playground", "github"),
            Item("Articles", "Say Goodbye to Password Fatigue: OpenID Authentication Explained", "https://medium.com/@codewithmunyao/say-goodbye-to-password-fatigue-openid-authentication-explained-d6e178d6854b", "article"),
            Item("Articles", "Building the Digital Drawbridge: A Complete Guide to API Gateways", "https://medium.com/@codewithmunyao/building-the-digital-drawbridge-a-complete-guide-to-api-gateways-03461cb7aa25", "article"),
            Item("Articles", "JUnit & Jest: A Tale of Two Testing Titans", "https://medium.com/@codewithmunyao/junit-jest-a-tale-of-two-testing-titans-136ab64d960c", "article"),
            Item("Articles", "Understanding the CAP Theorem", "https://medium.com/@codewithmunyao/understanding-the-cap-theorem-the-fundamental-trade-off-in-distributed-systems-457992f8e811", "article"),
            Item("Articles", "Quantum Computing for Web Developers", "https://medium.com/@codewithmunyao/quantum-computing-for-web-developers-preparing-for-the-post-binary-world-7025d889be81", "article"),
            Item("Articles", "The Polling Paradox", "https://medium.com/@codewithmunyao/the-polling-paradox-why-outdated-technology-beats-modern-real-time-solutions-2ae76bf4a351", "article"),
            Item("Articles", "The JavaScript Framework That Will Dominate 2026", "https://medium.com/@codewithmunyao/the-javascript-framework-that-will-dominate-2026-its-not-what-you-think-3622c8ee3abc", "article"),
            Item("Articles", "Mastering Node.js Process & System Modules", "https://medium.com/@codewithmunyao/mastering-node-js-process-and-system-modules-your-gateway-to-system-level-programming-8a300f05f703", "article"),
            Item("Articles", "Configuring Apache with Nginx as Reverse Proxy", "https://medium.com/@codewithmunyao/how-to-configure-apache-with-nginx-as-a-reverse-proxy-40009e1ba4bf", "article"),
            Item("Articles", "Understanding Node.js Bindings", "https://medium.com/@codewithmunyao/understanding-node-js-bindings-bridging-javascript-and-native-code-86695c602110", "article"),
            Item("Articles", "The Hidden Costs of Technical Debt: A Data-Driven Analysis", "https://medium.com/@codewithmunyao/the-hidden-costs-of-technical-debt-a-data-driven-analysis-df66fbe0e7c7", "article"),
            Item("Articles", "Custom Classes in Tailwind CSS 4.0", "https://medium.com/@codewithmunyao/how-to-define-custom-classes-in-tailwind-css-4-0-complete-guide-with-theme-directive-dd819a688650", "article"),
            Item("Articles", "The Hidden Risks of Third-Party Libraries", "https://medium.com/@codewithmunyao/the-hidden-risks-of-relying-too-much-on-third-party-libraries-2ebb2e94f2a9", "article"),
            Item("Articles", "The Multer Memory Trap", "https://medium.com/@codewithmunyao/the-multer-memory-trap-why-your-file-upload-strategy-is-killing-your-server-89f9e8797e58", "article"),
            Item("Dev.to", "Harnessing the Power of AWS Load Balancers, Nginx, and AI", "https://dev.to/codewithmunyao/harnessing-the-power-of-aws-load-balancers-nginx-and-ai-in-modern-development-3gio", "article"),
            Item("Dev.to", "Build a Portfolio Analysis Agent with AI", "https://dev.to/codewithmunyao/build-a-portfolio-analysis-agent-with-ai-a-guide-using-langgraph-56h8", "article"),
            Item("Dev.to", "The Rise of AI Agents: What Developers Need to Know", "https://dev.to/codewithmunyao/the-rise-of-ai-agents-what-developers-need-to-know-296n", "article"),
            Item("Dev.to", "Honor Unlocks Doors – A Lesson from Apostle Joshua Selman", "https://dev.to/codewithmunyao/honor-unlocks-doors-a-lesson-from-apostle-joshua-selman-enh", "article"),
            Item("Articles", "Yes, You Can Run SQL Server on Linux — Here's How to Do It Right", "https://medium.com/@codewithmunyao/yes-you-can-run-sql-server-on-linux-heres-how-to-do-it-right-f09211ee4732", "article"),
            Item("Articles", "The Relational Rebellion: Why NoSQL Won (And Why It Had To)", "https://medium.com/@codewithmunyao/the-relational-rebellion-why-nosql-won-and-why-it-had-to-fa20693c3c74", "article"),
            Item("Articles", "The Silent Killers of React Codebases: Code Smells You Need to Fix Today", "https://medium.com/@codewithmunyao/the-silent-killers-of-react-codebases-code-smells-you-need-to-fix-today-bc04fe771aa1", "article"),
            Item("Articles", "What Happens When Your Database Speaks the Same Language as Your App?", "https://medium.com/@codewithmunyao/what-happens-when-your-database-speaks-the-same-language-as-your-app-335aac981b92", "article"),
            Item("Articles", "Why Choosing a Database Is Really About Choosing a Data Contract", "https://medium.com/@codewithmunyao/why-choosing-a-database-is-really-about-choosing-a-data-contract-bc3e465bb7c0", "article"),
            Item("Articles", "The Complete TanStack Ecosystem: A Modern Alternative to Heavyweight Frameworks", "https://medium.com/@codewithmunyao/the-complete-tanstack-ecosystem-a-modern-alternative-to-heavyweight-frameworks-c65e317fec22", "article"),
            Item("Articles", "Building a Powerful Budget Home Server in 2025: A Complete Guide", "https://medium.com/@codewithmunyao/building-a-powerful-budget-home-server-in-2025-a-complete-guide-1b0a0b8c798f", "article"),
            Item("Articles", "Amazon's Billion-Dollar Logistics Problem: How They Solve the Most Complex Vehicle Routing Challenge in History", "https://medium.com/@codewithmunyao/amazons-billion-dollar-logistics-problem-how-they-solve-the-most-complex-vehicle-routing-ad770af7f40e", "article"),
            Item("Articles", "Building Resilient Systems: Beyond the Happy Path", "https://medium.com/@codewithmunyao/building-resilient-systems-beyond-the-happy-path-a174f12fa266", "article"),
        };

        await _repository.InsertManyAsync(works);
    }
}
