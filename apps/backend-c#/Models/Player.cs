using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tennis.Models;

public class Player
{
  public Player()
  {
    PlayerTournaments = new List<PlayerTournament>();
  }

  [Key]
  public int PlayerId { get; set; }
  public string Status { get; set; } = String.Empty;
  public virtual IEnumerable<PlayerTournament> PlayerTournaments { get; set; }
  public virtual ICollection<Game>? GamesPlayerA { get; set; }
  public virtual ICollection<Game>? GamesPlayerB { get; set; }

  [ForeignKey("UserId")]
  public int UserId { get; set; }
  public virtual User? User { get; set; }
}

