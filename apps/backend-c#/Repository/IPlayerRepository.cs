namespace Tennis.Repository;
using Tennis.Models;
using Tennis.DTO;

public interface IPlayerRepository
{
  PlayerDTO? GetPlayerById(int id);
  IEnumerable<PlayerDTO> GetAllPlayers();
  PlayerAddDTO AddPlayer(Player player);
  IEnumerable<TournamentInfoDTO>? GetPlayerTournaments(int playerId);
  IEnumerable<GameInfoPlayerDTO>? GetPlayerGames(int playerId);

}
