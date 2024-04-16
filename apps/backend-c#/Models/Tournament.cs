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
  [Required]
  public string Name { get; set; } = String.Empty;
  public string Status { get; set; } = String.Empty;
  public decimal PrizeMoney { get; set; } = 0;
  public virtual ICollection<Game>? Games { get; set; }
  public virtual IEnumerable<PlayerTournament> PlayerTournaments { get; set; }

  [ForeignKey("UserId")]
  public int UserId { get; set; }
  public virtual User? User { get; set; }
}