namespace Tennis.DTO;

public class GameDTO
{
  public int gameId { get; set; }
  public string gameStatus { get; set; } = String.Empty;
  public string tournamentName { get; set; } = String.Empty;
  public DateTime? gameDateTime { get; set; }
  public int playerAScore { get; set; }
  public string playerAFirstName { get; set; } = String.Empty;
  public string playerALastName { get; set; } = String.Empty;
  public int playerBScore { get; set; }
  public string playerBFirstName { get; set; } = String.Empty;
  public string playerBLastName { get; set; } = String.Empty;
}

public class AddGameDTO
{
  public int GameId { get; set; }
  public string Status { get; set; } = String.Empty;
  public string? GameDateTime { get; set; }
  public int TournamentId { get; set; }
  public int PlayerAScore { get; set; }
  public int PlayerBScore { get; set; }
  public int PlayerAId { get; set; }
  public int PlayerBId { get; set; }
}

public class AddGameDateTimeDTO
{
  public int gameId { get; set; }
  public string gameStatus { get; set; } = String.Empty;
  public DateTime? gameDateTime { get; set; }
  public int tournamentId { get; set; }
  public int playerAScore { get; set; }
  public int playerBScore { get; set; }
  public int playerAId { get; set; }
  public int playerBId { get; set; }
}

public class GameInfoTournamentDTO
{
  public int gameId { get; set; }
  public string gameStatus { get; set; } = String.Empty;
  public DateTime? gameDateTime { get; set; }
  public int playerAScore { get; set; }
  public string playerAFirstName { get; set; } = String.Empty;
  public string playerALastName { get; set; } = String.Empty;
  public int playerBScore { get; set; }
  public string playerBFirstName { get; set; } = String.Empty;
  public string playerBLastName { get; set; } = String.Empty;
}

public class GameInfoPlayerDTO
{
  public int gameId { get; set; }
  public string gameStatus { get; set; } = String.Empty;
  public DateTime? gameDateTime { get; set; }
  public int tournamentId { get; set; }
  public int playerScore { get; set; }
  public int opponentId { get; set; }
  public int opponentScore { get; set; }
}