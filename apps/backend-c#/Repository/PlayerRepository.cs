namespace Tennis.Repository;

using Microsoft.EntityFrameworkCore;
using Tennis.DTO;
using Tennis.Models;

public class PlayerRepository : IPlayerRepository
{
  protected readonly ITennisContext _context;
  public PlayerRepository(ITennisContext context)
  {
    _context = context;
  }

  public PlayerDTO? GetPlayerById(int id)
  {
    var player = _context.Players
    .Include(player => player.User)
    .FirstOrDefault(player => player.PlayerId == id);
    if (player == null || player.User == null) { return null; };
    return new PlayerDTO
    {
      playerId = player.PlayerId,
      status = player.Status,
      firstName = player.User.FirstName,
      lastName = player.User.LastName,
      email = player.User.Email,
    };
  }
  public IEnumerable<PlayerDTO> GetAllPlayers()
  {
    return _context.Players.Include(player => player.User)
      .Where(player => player.User != null)
      .Select(player => new PlayerDTO
      {
        playerId = player.PlayerId,
        status = player.Status,
        firstName = player.User!.FirstName,
        lastName = player.User!.LastName,
        email = player.User!.Email,
      }).ToList();
  }
  public PlayerAddDTO AddPlayer(Player player)
  {
    _context.Players.Add(player);
    _context.SaveChanges();
    return new PlayerAddDTO
    {
      playerId = player.PlayerId,
      status = player.Status,
      userId = player.UserId
    };
  }
}