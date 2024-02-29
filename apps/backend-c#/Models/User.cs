using System.ComponentModel.DataAnnotations;

namespace Tennis.Models;

public class User
{
  [Key]
  public int UserId { get; set; }
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public string? Email { get; set; }
  public string? Password { get; set; }
  public virtual Player? Player { get; set; }
  public virtual ICollection<Tournament>? Tournaments { get; set; }
}