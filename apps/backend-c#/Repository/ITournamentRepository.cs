using Tennis.DTO;
using Tennis.Models;

namespace Tennis.Repository;
public interface ITournamentRepository
{
  TournamentDTO? GetTournamentById(int id);
  IEnumerable<TournamentDTO> GetAllTournaments();
  TournamentAddDTO AddTournament(Tournament tournament);
}