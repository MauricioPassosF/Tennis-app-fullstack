using System.ComponentModel.DataAnnotations;

namespace Tennis.Models;

public class User
{
  [Key]
  public int UserId { get; set; }
  public string FirstName { get; set; } = String.Empty;
  public string LastName { get; set; } = String.Empty;
  public string Email { get; set; } = String.Empty;
  public string Password { get; set; } = String.Empty;
  public virtual Player? Player { get; set; }
  public virtual ICollection<Tournament>? Tournaments { get; set; }
}