using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PortfolioApi.Common.Options;
using PortfolioApi.Data;
using PortfolioApi.Data.Seed;
using PortfolioApi.Modules.Articles.Interfaces;
using PortfolioApi.Modules.Articles.Repositories;
using PortfolioApi.Modules.Articles.Seed;
using PortfolioApi.Modules.Articles.Services;
using PortfolioApi.Modules.Auth.Interfaces;
using PortfolioApi.Modules.Auth.Repositories;
using PortfolioApi.Modules.Auth.Seed;
using PortfolioApi.Modules.Auth.Services;
using PortfolioApi.Modules.Profile.Interfaces;
using PortfolioApi.Modules.Profile.Repositories;
using PortfolioApi.Modules.Profile.Seed;
using PortfolioApi.Modules.Profile.Services;
using PortfolioApi.Modules.Projects.Interfaces;
using PortfolioApi.Modules.Projects.Repositories;
using PortfolioApi.Modules.Projects.Seed;
using PortfolioApi.Modules.Projects.Services;
using PortfolioApi.Modules.SocialLinks.Interfaces;
using PortfolioApi.Modules.SocialLinks.Repositories;
using PortfolioApi.Modules.SocialLinks.Seed;
using PortfolioApi.Modules.SocialLinks.Services;
using PortfolioApi.Modules.Works.Interfaces;
using PortfolioApi.Modules.Works.Repositories;
using PortfolioApi.Modules.Works.Seed;
using PortfolioApi.Modules.Works.Services;

namespace PortfolioApi.Common.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMongoDb(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<MongoDbOptions>(configuration.GetSection(MongoDbOptions.SectionName));
        services.AddSingleton<IMongoDbContext, MongoDbContext>();
        return services;
    }

    public static IServiceCollection AddPortfolioModules(this IServiceCollection services)
    {
        // Auth
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IDataSeeder, AuthSeeder>();

        // Profile
        services.AddScoped<IProfileRepository, ProfileRepository>();
        services.AddScoped<IProfileService, ProfileService>();
        services.AddScoped<IDataSeeder, ProfileSeeder>();

        // Projects
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IDataSeeder, ProjectSeeder>();

        // Social links
        services.AddScoped<ISocialLinkRepository, SocialLinkRepository>();
        services.AddScoped<ISocialLinkService, SocialLinkService>();
        services.AddScoped<IDataSeeder, SocialLinkSeeder>();

        // Articles
        services.AddScoped<IArticleRepository, ArticleRepository>();
        services.AddScoped<IArticleService, ArticleService>();
        services.AddScoped<IDataSeeder, ArticleSeeder>();

        // Works (real GitHub repos / published articles, grouped by category)
        services.AddScoped<IWorkRepository, WorkRepository>();
        services.AddScoped<IWorkService, WorkService>();
        services.AddScoped<IDataSeeder, WorkSeeder>();

        services.AddScoped<DataSeeder>();

        return services;
    }

    public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtSection = configuration.GetSection(JwtOptions.SectionName);
        services.Configure<JwtOptions>(jwtSection);
        var jwtOptions = jwtSection.Get<JwtOptions>() ?? new JwtOptions();

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtOptions.Issuer,
                ValidAudience = jwtOptions.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret)),
            };
        });

        services.AddAuthorization();

        return services;
    }

    public static IServiceCollection AddClientCors(this IServiceCollection services, string policyName)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(policyName, policy =>
            {
                policy.WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        return services;
    }

    public static IServiceCollection AddSwaggerWithJwt(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Portfolio API", Version = "v1" });

            var securityScheme = new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "Enter a valid JWT token (returned by POST /api/auth/login).",
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer",
                },
            };

            options.AddSecurityDefinition("Bearer", securityScheme);
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                { securityScheme, Array.Empty<string>() },
            });
        });

        return services;
    }
}
