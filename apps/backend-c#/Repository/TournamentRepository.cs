using Microsoft.EntityFrameworkCore;
using Tennis.DTO;
using Tennis.Models;

namespace Tennis.Repository;

public class TournamentRepository : ITournamentRepository
{
  protected readonly ITennisContext _context;

  public TournamentRepository(ITennisContext context)
  {
    _context = context;
  }
  public TournamentDTO? GetTournamentById(int id)
  {
    var tournament = _context.Tournaments
    .Include(tournament => tournament.User)
    .FirstOrDefault(tournament => tournament.TournamentId == id);
    if (tournament == null || tournament.User == null) { return null; }
    return new TournamentDTO
    {
      tournamentId = tournament.TournamentId,
      tournamentName = tournament.Name,
      tournamentStatus = tournament.Status,
      prizeMoney = tournament.PrizeMoney,
      admFirstName = tournament.User.FirstName,
      admLastName = tournament.User.LastName
    };
  }
  public IEnumerable<TournamentDTO> GetAllTournaments()
  {
    return _context.Tournaments
    .Include(tournament => tournament.User)
    .Where(tournament => tournament.User != null)
    .Select(tournament => new TournamentDTO
    {
      tournamentId = tournament.TournamentId,
      tournamentName = tournament.Name,
      tournamentStatus = tournament.Status,
      prizeMoney = tournament.PrizeMoney,
      admFirstName = tournament.User!.FirstName,
      admLastName = tournament.User!.LastName
    }).ToList();
  }
  public IEnumerable<PlayerDTO>? GetTournamentPlayers(int tournamentId)
  {
    var tournament = _context.Tournaments
      .Include(tournament => tournament.PlayerTournaments)
      .ThenInclude(tournamentPlayer => tournamentPlayer.Player)
      .ThenInclude(player => player.User)
      .FirstOrDefault(tournament => tournament.TournamentId == tournamentId);
    if (tournament == null || tournament.PlayerTournaments == null) { return null; }
    return tournament.PlayerTournaments
    .Where(playerTournament => playerTournament.Tournament != null)
    .Select(playerTournament => new PlayerDTO
    {
      playerId = playerTournament.PlayerId,
      status = playerTournament.Player.Status,
      firstName = playerTournament.Player.User!.FirstName,
      lastName = playerTournament.Player.User!.LastName,
      email = playerTournament.Player.User!.Email
    }).ToList();
  }
  public IEnumerable<GameInfoTournamentDTO>? GetTournamentGames(int tournamentId)
  {
    var games = _context.Games
      .Include(game => game.Tournament)
      .Include(game => game.PlayerA)
      .Include(game => game.PlayerB)
      .Where(game => game.TournamentId == tournamentId || game.PlayerA != null || game.PlayerB != null)
      .ToList();
    foreach (var game in games)
    {
      _context.Entry(game.PlayerA!).Reference(player => player.User).Load();
      _context.Entry(game.PlayerB!).Reference(player => player.User).Load();
    }
    return games.Select(game => new GameInfoTournamentDTO
    {
      gameId = game.GameId,
      gameStatus = game.Status,
      playerAScore = game.PlayerAScore,
      playerAFirstName = game.PlayerA!.User!.FirstName,
      playerALastName = game.PlayerA.User.LastName,
      playerBScore = game.PlayerBScore,
      playerBFirstName = game.PlayerB!.User!.FirstName,
      playerBLastName = game.PlayerB.User.LastName,
    }).ToList();
  }

  public TournamentAddDTO AddTournament(Tournament tournament)
  {
    _context.Tournaments.Add(tournament);
    _context.SaveChanges();
    return new TournamentAddDTO
    {
      tournamentId = tournament.TournamentId,
      tournamentName = tournament.Name,
      tournamentStatus = tournament.Status,
      prizeMoney = tournament.PrizeMoney,
      userId = tournament.UserId
    };
  }
  public PlayerTournament AddPlayerInTournament(PlayerTournament playerTournamentInfo)
  {
    _context.PlayerTournaments.Add(playerTournamentInfo);
    _context.SaveChanges();
    return playerTournamentInfo;
  }

}