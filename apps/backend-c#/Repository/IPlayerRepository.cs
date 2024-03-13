namespace Tennis.Repository;
using Tennis.Models;
public interface IPlayerRepository
{
  Player? GetPlayerById(int id);
  IEnumerable<Player> GetAllPlayers();
  Player AddPlayer(Player player);
}
