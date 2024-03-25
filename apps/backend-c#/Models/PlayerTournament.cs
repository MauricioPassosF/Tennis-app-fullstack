using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tennis.Models;

public class PlayerTournament
{
  public PlayerTournament()
  {
    Player = new Player();
  }

  [Key]
  public int PlayerTournamentId { get; set; }

  [ForeignKey("TournamentId")]
  public int TournamentId { get; set; }
  public virtual Tournament? Tournament { get; set; }

  [ForeignKey("PlayerId")]
  public int PlayerId { get; set; }
  public virtual Player Player { get; set; }
}