namespace Tennis.Repository;
using Microsoft.EntityFrameworkCore;
using Tennis.Models;

public interface ITennisContext
{
  public DbSet<User> Users { get; set; }
  public DbSet<Player> Players { get; set; }
  public DbSet<Game> Games { get; set; }
  public DbSet<Tournament> Tournaments { get; set; }
  public DbSet<PlayerTournament> PlayerTournaments { get; set; }
  public int SaveChanges();
}