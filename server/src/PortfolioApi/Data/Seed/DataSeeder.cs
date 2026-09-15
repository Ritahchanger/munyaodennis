namespace PortfolioApi.Data.Seed;

public class DataSeeder
{
    private readonly IEnumerable<IDataSeeder> _seeders;
    private readonly ILogger<DataSeeder> _logger;

    public DataSeeder(IEnumerable<IDataSeeder> seeders, ILogger<DataSeeder> logger)
    {
        _seeders = seeders;
        _logger = logger;
    }

    public async Task SeedAllAsync()
    {
        foreach (var seeder in _seeders)
        {
            _logger.LogInformation("Running seeder: {Seeder}", seeder.GetType().Name);
            await seeder.SeedAsync();
        }
    }
}
