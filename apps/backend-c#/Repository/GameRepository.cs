using Tennis.Models;

namespace Tennis.Repository;

public class GameRepository : IGameRepository
{

  protected readonly ITennisContext _context;

  public GameRepository(ITennisContext context)
  {
    _context = context;
  }

  public Game? GetGameById(int gameId)
  {
    var game = _context.Games
      .FirstOrDefault(game => game.GameId == gameId);
    if (game == null) { return null; }
    return game;
  }
  public IEnumerable<Game> GetAllGames()
  {
    return _context.Games.ToList();
  }
  public Game? AddGame(Game game)
  {
    _context.Games.Add(game);
    _context.SaveChanges();
    return game;
  }
}