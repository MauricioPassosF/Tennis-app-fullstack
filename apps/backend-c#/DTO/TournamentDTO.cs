namespace Tennis.DTO;
public class TournamentDTO
{
  public int tournamentId { get; set; }
  public string tournamentName { get; set; } = String.Empty;
  public string tournamentStatus { get; set; } = String.Empty;
  public decimal prizeMoney { get; set; }
  public string admFirstName { get; set; } = String.Empty;
  public string admLastName { get; set; } = String.Empty;

}

public class TournamentAddDTO
{
  public int tournamentId { get; set; }
  public string tournamentName { get; set; } = String.Empty;
  public string tournamentStatus { get; set; } = String.Empty;
  public decimal prizeMoney { get; set; }
  public int userId { get; set; }

}

public class TournamentInfoDTO
{
  public int tournamentId { get; set; }
  public string tournamentName { get; set; } = String.Empty;
  public string tournamentStatus { get; set; } = String.Empty;
}
