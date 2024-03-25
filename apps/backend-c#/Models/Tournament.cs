using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tennis.Models;

public class Tournament
{
  public Tournament()
  {
    PlayerTournaments = new List<PlayerTournament>();
  }

  [Key]
  public int TournamentId { get; set; }
  public string Name { get; set; } = String.Empty;
  public string Status { get; set; } = String.Empty;
  public int PrizeMoney { get; set; }
  public virtual ICollection<Game>? Games { get; set; }
  public virtual IEnumerable<PlayerTournament> PlayerTournaments { get; set; }

  [ForeignKey("UserId")]
  public int UserId { get; set; }
  public virtual User? User { get; set; }
}