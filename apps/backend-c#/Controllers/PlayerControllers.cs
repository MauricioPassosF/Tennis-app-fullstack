using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tennis.Models;
using Tennis.Repository;

[ApiController]
[Route("player")]
public class PlayerController : Controller
{
  protected readonly IPlayerRepository _repository;
  public PlayerController(IPlayerRepository repository)
  {
    _repository = repository;
  }

  [HttpGet]
  public IActionResult GetAll()
  {
    return Ok(_repository.GetAllPlayers());
  }

  [HttpGet("{playerId}")]
  public IActionResult GetById(int playerId)
  {
    var player = _repository.GetPlayerById(playerId);
    if (player == null)
    {
      return BadRequest(new { message = "Jogador não cadastrado" });
    }
    return Ok(player);
  }

  [Authorize]
  [HttpGet("user/{userId}")]
  public IActionResult GetByUserId(int userId)
  {
    var player = _repository.GetPlayerByUserId(userId);
    if (player == null)
    {
      return BadRequest(new { message = "Usuário não está cadastrado como jogador" });
    }
    return Ok(player);
  }

  [HttpGet("{playerId}/tournaments")]
  public IActionResult GetTournaments(int playerId)
  {
    return Ok(_repository.GetPlayerTournaments(playerId));
  }

  [HttpGet("{playerId}/games")]
  public IActionResult Getgames(int playerId)
  {
    return Ok(_repository.GetPlayerGames(playerId));
  }

  [HttpPost]
  public IActionResult Add([FromBody] Player player)
  {
    return Created("", _repository.AddPlayer(player));
  }
}