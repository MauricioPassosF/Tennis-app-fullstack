using Tennis.DTO;
using Tennis.Models;

namespace Tennis.Repository;

public interface IGameRepository
{
  GameDTO? GetGameById(int gameId);
  IEnumerable<GameDTO> GetAllGames();
  AddGameDTO AddGame(Game game);
}