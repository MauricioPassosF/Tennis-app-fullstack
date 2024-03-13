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
  public IActionResult GetbyId(int playerId)
  {
    var player = _repository.GetPlayerById(playerId);
    if (player == null)
    {
      return BadRequest(new { message = "Jogador não cadastrado" });
    }
    return Ok(player);
  }

  [HttpPost]
  public IActionResult Add([FromBody] Player player)
  {
    return Created("", _repository.AddPlayer(player));
  }
}