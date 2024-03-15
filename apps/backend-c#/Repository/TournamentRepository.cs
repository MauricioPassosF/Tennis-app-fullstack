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
}