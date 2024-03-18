using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Tennis.Models;
namespace Tennis.Repository;
public class TennisContext : DbContext, ITennisContext
{
  private string _connectionString = "Server=127.0.0.1;Database=tennis_app;User=SA;Password=SqlServer123@;TrustServerCertificate=true";
  public TennisContext(DbContextOptions<TennisContext> options) : base(options) { }
  public DbSet<User> Users { get; set; }
  public DbSet<Player> Players { get; set; }
  public DbSet<Game> Games { get; set; }
  public DbSet<Tournament> Tournaments { get; set; }
  public DbSet<PlayerTournament> PlayerTournaments { get; set; }
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseSqlServer(_connectionString);
  }
  public override EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class
  {
    return base.Entry(entity);
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Player>()
    .HasOne(p => p.User)
    .WithOne(u => u.Player)
    .HasForeignKey<Player>(u => u.UserId);

    modelBuilder.Entity<Tournament>()
    .HasOne(t => t.User)
    .WithMany(u => u.Tournaments)
    .HasForeignKey(u => u.UserId);

    modelBuilder.Entity<PlayerTournament>()
    .HasOne(pt => pt.Player)
    .WithMany(p => p.PlayerTournaments)
    .HasForeignKey(p => p.PlayerId)
    .OnDelete(DeleteBehavior.Restrict); ;

    modelBuilder.Entity<PlayerTournament>()
    .HasOne(pt => pt.Tournament)
    .WithMany(t => t.PlayerTournaments)
    .HasForeignKey(t => t.TournamentId);

    modelBuilder.Entity<Game>()
    .HasOne(g => g.PlayerA)
    .WithMany(p => p.GamesPlayerA)
    .HasForeignKey(p => p.PlayerAId)
    .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Game>()
    .HasOne(g => g.PlayerB)
    .WithMany(p => p.GamesPlayerB)
    .HasForeignKey(p => p.PlayerBId)
    .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Game>()
    .HasOne(g => g.Tournament)
    .WithMany(t => t.Games)
    .HasForeignKey(t => t.TournamentId);
  }
}
