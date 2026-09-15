using System.Text.Json.Serialization;
using Microsoft.Extensions.FileProviders;
using PortfolioApi.Common.Extensions;
using PortfolioApi.Common.Middleware;
using PortfolioApi.Data.Seed;

const string ClientCorsPolicy = "ClientApp";

// Images live outside both `server/` and `client/`, in a shared `uploads/` folder at the
// repo root (e.g. drop a file in uploads/projects/foo.jpg, reference it as /uploads/projects/foo.jpg).
var repoRoot = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "..", ".."));
var uploadsPath = Path.Combine(repoRoot, "uploads");
Directory.CreateDirectory(uploadsPath);

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddMongoDb(builder.Configuration);
builder.Services.AddPortfolioModules();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddClientCors(ClientCorsPolicy);
builder.Services.AddSwaggerWithJwt();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseCors(ClientCorsPolicy);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads",
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        var seeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
        await seeder.SeedAllAsync();
        logger.LogInformation("Database seeding completed.");
    }
    catch (Exception ex)
    {
        logger.LogWarning(ex, "Database seeding was skipped — MongoDB may not be reachable yet.");
    }
}

app.Run();
