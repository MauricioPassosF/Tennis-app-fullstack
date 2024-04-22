using Microsoft.EntityFrameworkCore;
using Tennis.DTO;
using Tennis.Models;

namespace Tennis.Repository;

public class GameRepository : IGameRepository
{

  protected readonly ITennisContext _context;

  public GameRepository(ITennisContext context)
  {
    _context = context;
  }

  public GameDTO? GetGameById(int gameId)
  {
    var game = _context.Games
      .Include(game => game.Tournament)
      .Include(game => game.PlayerA)
      .Include(game => game.PlayerB)
      .FirstOrDefault(game => game.GameId == gameId);
    if (game == null || game.Tournament == null ||
     game.PlayerA == null || game.PlayerB == null) { return null; }
    _context.Entry(game.PlayerA).Reference(player => player.User).Load();
    _context.Entry(game.PlayerB).Reference(player => player.User).Load();
    return new GameDTO
    {
      gameId = game.GameId,
      gameStatus = game.Status,
      gameDateTime = game.GameDateTime,
      tournamentName = game.Tournament.Name,
      playerAScore = game.PlayerAScore,
      playerAFirstName = game.PlayerA.User!.FirstName,
      playerALastName = game.PlayerA.User.LastName,
      playerBScore = game.PlayerBScore,
      playerBFirstName = game.PlayerB.User!.FirstName,
      playerBLastName = game.PlayerB.User.LastName,
    };
  }
  public IEnumerable<GameDTO> GetAllGames()
  {
    var games = _context.Games
      .Include(game => game.Tournament)
      .Include(game => game.PlayerA)
      .Include(game => game.PlayerB)
      .Where(game => game.PlayerA != null || game.PlayerB != null || game.Tournament != null)
      .ToList();
    foreach (var game in games)
    {
      _context.Entry(game.PlayerA!).Reference(player => player.User).Load();
      _context.Entry(game.PlayerB!).Reference(player => player.User).Load();
    }
    return games.Select(game => new GameDTO
    {
      gameId = game.GameId,
      gameStatus = game.Status,
      gameDateTime = game.GameDateTime,
      tournamentName = game.Tournament!.Name,
      playerAScore = game.PlayerAScore,
      playerAFirstName = game.PlayerA!.User!.FirstName,
      playerALastName = game.PlayerA.User.LastName,
      playerBScore = game.PlayerBScore,
      playerBFirstName = game.PlayerB!.User!.FirstName,
      playerBLastName = game.PlayerB.User.LastName,
    }).ToList();
  }
  public AddGameDateTimeDTO AddGame(AddGameDTO gameInfo)
  {

    Game newGame = new Game
    {
      GameId = gameInfo.GameId,
      PlayerAId = gameInfo.PlayerAId,
      PlayerBId = gameInfo.PlayerBId,
      PlayerAScore = gameInfo.PlayerAScore,
      PlayerBScore = gameInfo.PlayerBScore,
      TournamentId = gameInfo.TournamentId,
      Status = gameInfo.Status
    };
    if (gameInfo.GameDateTime != null)
    {
      DateTime gameDateTime;
      if (DateTime.TryParse(gameInfo.GameDateTime, out gameDateTime))
      {
        newGame.GameDateTime = gameDateTime;
      };
    }
    _context.Games.Add(newGame);
    _context.SaveChanges();
    return new AddGameDateTimeDTO
    {
      gameId = newGame.GameId,
      playerAId = newGame.PlayerAId,
      playerAScore = newGame.PlayerAScore,
      playerBId = newGame.PlayerBId,
      playerBScore = newGame.PlayerBScore,
      tournamentId = newGame.TournamentId,
      gameStatus = newGame.Status,
      gameDateTime = newGame.GameDateTime
    };
  }
}