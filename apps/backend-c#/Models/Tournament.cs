using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tennis.Models;

public class Tournament
{
  [Key]
  public int TournamentId { get; set; }
  public string? Name { get; set; }
  public string? Status { get; set; }
  public int PrizeMoney { get; set; }
  public virtual ICollection<Game>? Games { get; set; }
  public virtual ICollection<PlayerTournament>? PlayerTournaments { get; set; }

  [ForeignKey("UserId")]
  public int UserId { get; set; }
  public virtual User? User { get; set; }
}