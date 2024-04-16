namespace Tennis.DTO;


public class UserDTO
{
  public int userId { get; set; }
  public string firstName { get; set; } = String.Empty;
  public string lastName { get; set; } = String.Empty;
  public string email { get; set; } = String.Empty;
}

public class LoginDto
{
  public string email { get; set; } = String.Empty;
  public string password { get; set; } = String.Empty;
}