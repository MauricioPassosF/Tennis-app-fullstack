namespace Tennis.DTO;
public class PlayerDTO
{
  public int playerId { get; set; }
  public string status { get; set; } = String.Empty;
  public string firstName { get; set; } = String.Empty;
  public string lastName { get; set; } = String.Empty;
  public string email { get; set; } = String.Empty;
}

public class PlayerAddDTO
{
  public int playerId { get; set; }
  public string status { get; set; } = String.Empty;
  public int userId { get; set; }
}