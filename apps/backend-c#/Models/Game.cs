using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tennis.Models;

public class Game
{

  [Key]
  public int GameId { get; set; }
  public int PlayerAScore { get; set; } = 0;
  public int PlayerBScore { get; set; } = 0;
  public string Status { get; set; } = String.Empty;
  public DateTime? GameDateTime { get; set; }

  [ForeignKey("PlayerAId")]
  public int PlayerAId { get; set; }
  public virtual Player? PlayerA { get; set; }

  [ForeignKey("PlayerBId")]
  public int PlayerBId { get; set; }
  public virtual Player? PlayerB { get; set; }

  [ForeignKey("TournamentId")]
  public int TournamentId { get; set; }
  public virtual Tournament? Tournament { get; set; }
}