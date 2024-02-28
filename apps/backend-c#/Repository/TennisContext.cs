using Microsoft.EntityFrameworkCore;

public class TennisContext : DbContext
{
  private string connectionString = "Server=127.0.0.1;Database=tennis_app;User=SA;Password=SqlServer123@";
  public TennisContext(DbContextOptions<TennisContext> options) : base(options) { }
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    if (!optionsBuilder.IsConfigured)
    {
      optionsBuilder.UseSqlServer(connectionString);
    }
  }
}
