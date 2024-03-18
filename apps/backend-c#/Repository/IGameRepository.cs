using Tennis.Models;

namespace Tennis.Repository;

public interface IGameRepository
{
  Game? GetGameById(int gameId);
  IEnumerable<Game> GetAllGames();
  Game? AddGame(Game game);
}