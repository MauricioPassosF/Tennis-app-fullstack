using Microsoft.AspNetCore.Mvc;
using Tennis.Models;
using Tennis.Repository;

namespace Tennis.Controllers;

[ApiController]
[Route("game")]
public class GameController : Controller
{
  protected readonly IGameRepository _repository;
  public GameController(IGameRepository repository)
  {
    _repository = repository;
  }

  [HttpGet]
  public IActionResult GetAll()
  {
    return Ok(_repository.GetAllGames());
  }

  [HttpGet("{gameId}")]
  public IActionResult GetById(int gameId)
  {
    var game = _repository.GetGameById(gameId);
    if (game == null)
    {
      return BadRequest(new { message = "Jogo não cadastrado" });
    }
    return Ok(game);
  }

  [HttpPost]
  public IActionResult Add([FromBody] Game game)
  {
    return Created("", _repository.AddGame(game));
  }
}