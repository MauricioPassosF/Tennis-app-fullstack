using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tennis.Models;

public class PlayerTournament
{
  [Key, Column(Order = 1)]
  // public int PlayerTournamentId { get; set; }

  // [ForeignKey("TournamentId")]
  public int TournamentId { get; set; }
  public virtual Tournament? Tournament { get; set; }

  [Key, Column(Order = 2)]

  // [ForeignKey("PlayerId")]
  public int PlayerId { get; set; }
  public virtual Player? Player { get; set; }
}