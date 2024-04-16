using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Tennis.Models;
namespace Tennis.Repository;
public class TennisContext : DbContext, ITennisContext
{
  private readonly IWebHostEnvironment _env;
  public TennisContext(DbContextOptions<TennisContext> options, IWebHostEnvironment env) : base(options)
  {
    _env = env;
  }
  // private string _connectionString = "Server=db;User=SA;Password=SqlServer123@;TrustServerCertificate=true";

  public DbSet<User> Users { get; set; }
  public DbSet<Player> Players { get; set; }
  public DbSet<Game> Games { get; set; }
  public DbSet<Tournament> Tournaments { get; set; }
  public DbSet<PlayerTournament> PlayerTournaments { get; set; }
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    string connectionString = _env.IsDevelopment()
      ? "Server=localhost;User=SA;Password=SqlServer123@;TrustServerCertificate=true"
      : "Server=db;User=SA;Password=SqlServer123@;TrustServerCertificate=true";
    optionsBuilder.UseSqlServer(connectionString);
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
    .HasForeignKey<Player>(u => u.UserId)
    .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Tournament>()
    .HasOne(t => t.User)
    .WithMany(u => u.Tournaments)
    .HasForeignKey(u => u.UserId)
    .OnDelete(DeleteBehavior.Restrict);

    //   modelBuilder.Entity<PlayerTournament>()
    //  .HasKey(pt => new { pt.PlayerId, pt.TournamentId });

    modelBuilder.Entity<PlayerTournament>()
    .HasKey(pt => new { pt.PlayerId, pt.TournamentId });

    modelBuilder.Entity<PlayerTournament>()
    .HasOne(pt => pt.Player)
    .WithMany(p => p.PlayerTournaments)
    .HasForeignKey(p => p.PlayerId)
    .OnDelete(DeleteBehavior.Restrict);

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

    modelBuilder.Entity<Player>()
    .ToTable(t => t.HasCheckConstraint("CK_Player_Status", "Status IN ('Apto', 'Ausente', 'Lesionado')"));

    modelBuilder.Entity<Tournament>()
    .ToTable(t => t.HasCheckConstraint("CK_Tournament_Status", "Status IN ('Em andamento', 'Contínuo', 'Finalizado', 'Não iniciado')"));

    modelBuilder.Entity<Game>()
    .ToTable(t => t.HasCheckConstraint("CK_Game_Status", "Status IN ('Não agendado','Em andamento', 'Finalizado', 'Não iniciado')"));

    modelBuilder.Entity<Tournament>()
        .Property(t => t.PrizeMoney)
        .HasPrecision(18, 2);

    modelBuilder.Entity<Game>()
    .Property(g => g.GameDateTime)
    .IsRequired(false);
  }
}
