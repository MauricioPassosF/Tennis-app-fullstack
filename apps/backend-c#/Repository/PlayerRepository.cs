namespace Tennis.Repository;

using System.Drawing.Drawing2D;
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

  public IEnumerable<TournamentInfoDTO>? GetPlayerTournaments(int playerId)
  {
    var player = _context.Players
    .Include(player => player.PlayerTournaments)
    .ThenInclude(playerTournament => playerTournament.Tournament)
    .FirstOrDefault(player => player.PlayerId == playerId);
    if (player == null || player.PlayerTournaments == null) { return null; }
    return player.PlayerTournaments
      .Where(playerTournament => playerTournament.Tournament != null)
      .Select(playerTournament => new TournamentInfoDTO
      {
        tournamentId = playerTournament.Tournament!.TournamentId,
        tournamentName = playerTournament.Tournament!.Name,
        tournamentStatus = playerTournament.Tournament!.Status
      }).ToList();
  }

  public IEnumerable<GameInfoPlayerDTO>? GetPlayerGames(int playerId)
  {
    var player = _context.Players
    .Include(player => player.GamesPlayerA)
    .Include(player => player.GamesPlayerB)
    .FirstOrDefault(player => player.PlayerId == playerId);
    if (player == null || player.GamesPlayerA == null || player.GamesPlayerB == null) { return null; }
    var games = player.GamesPlayerA.Concat(player.GamesPlayerB);
    return games.Select(game => new GameInfoPlayerDTO
    {
      gameId = game.GameId,
      gameStatus = game.Status,
      tournamentId = game.TournamentId,
      playerScore = game.PlayerAId == playerId ? game.PlayerAScore : game.PlayerBScore,
      opponentId = game.PlayerAId == playerId ? game.PlayerBId : game.PlayerAId,
      opponentScore = game.PlayerAId == playerId ? game.PlayerBScore : game.PlayerAScore
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