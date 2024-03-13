namespace Tennis.Repository;

using Tennis.Models;

public class PlayerRepository : IPlayerRepository
{
  protected readonly ITennisContext _context;
  public PlayerRepository(ITennisContext context)
  {
    _context = context;
  }

  public Player? GetPlayerById(int id)
  {
    return _context.Players.FirstOrDefault(player => player.PlayerId == id);
  }
  public IEnumerable<Player> GetAllPlayers()
  {
    return _context.Players;
  }
  public Player AddPlayer(Player player)
  {
    _context.Players.Add(player);
    _context.SaveChanges();
    return player;
  }
}