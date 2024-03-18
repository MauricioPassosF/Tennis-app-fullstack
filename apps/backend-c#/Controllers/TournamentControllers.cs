using Microsoft.AspNetCore.Mvc;
using Tennis.Models;
using Tennis.Repository;

[ApiController]
[Route("tournament")]
public class TournamentController : Controller
{
  protected readonly ITournamentRepository _repository;
  public TournamentController(ITournamentRepository repository)
  {
    _repository = repository;
  }

  [HttpGet]
  public IActionResult GetAll()
  {
    return Ok(_repository.GetAllTournaments());
  }

  [HttpGet("{tournamentId}")]
  public IActionResult GetbyId(int tournamentId)
  {
    var tournament = _repository.GetTournamentById(tournamentId);
    if (tournament == null)
    {
      return BadRequest(new { message = "Torneio não cadastrado" });
    }
    return Ok(tournament);
  }

  [HttpGet("{tournamentId}/players")]
  public IActionResult GetTournaments(int tournamentId)
  {
    return Ok(_repository.GetTournamentPlayers(tournamentId));
  }

  [HttpPost]
  public IActionResult Add([FromBody] Tournament tournament)
  {
    return Created("", _repository.AddTournament(tournament));
  }

  [HttpPost("addPlayer")]
  public IActionResult Add([FromBody] PlayerTournament playerTournamentInfo)
  {
    return Created("", _repository.AddPlayerInTournament(playerTournamentInfo));
  }
}