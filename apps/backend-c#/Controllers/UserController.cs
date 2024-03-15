namespace Tennis.Controllers;

using Microsoft.AspNetCore.Mvc;
using Tennis.Models;
using Tennis.Repository;

[ApiController]
[Route("user")]

public class UserController : Controller
{
  protected readonly IUserRepository _repository;
  public UserController(IUserRepository repository)
  {
    _repository = repository;
  }

  [HttpGet("{userId}")]
  public IActionResult GetById(int userId)
  {
    var user = _repository.GetUserById(userId);
    if (user == null)
    {
      return BadRequest(new { message = "Usuário não cadastrado" });
    }
    return Ok(user);
  }

  [HttpGet]
  public IActionResult GetAll()
  {
    return Ok(_repository.GetAllUsers());
  }

  [HttpGet("{userId}/tournaments")]
  public IActionResult GetTournaments(int userId)
  {
    return Ok(_repository.GetUserTournaments(userId));
  }

  [HttpPost]
  public IActionResult Add([FromBody] User user)
  {
    return Created("", _repository.AddUser(user));
  }

}