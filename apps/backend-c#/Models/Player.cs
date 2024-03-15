using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tennis.Models;

public class Player
{
  [Key]
  public int PlayerId { get; set; }
  public string Status { get; set; } = String.Empty;
  public virtual ICollection<PlayerTournament>? PlayerTournaments { get; set; }
  public virtual ICollection<Game>? GamesPlayerA { get; set; }
  public virtual ICollection<Game>? GamesPlayerB { get; set; }

  [ForeignKey("UserId")]
  public int UserId { get; set; }
  public virtual User? User { get; set; }
}