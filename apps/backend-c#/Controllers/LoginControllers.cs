namespace Tennis.Controllers;

using Microsoft.AspNetCore.Mvc;
using Tennis.DTO;
using Tennis.Repository;
using Tennis.Services;

[ApiController]
[Route("login")]

public class LoginController : Controller
{
  protected readonly IUserRepository _repository;

  public LoginController(IUserRepository repository)
  {
    _repository = repository;
  }

  [HttpPost]
  public IActionResult Login([FromBody] LoginDto loginInfo)
  {
    var user = _repository.Login(loginInfo);
    if (user == null)
    {
      return Unauthorized(new { message = "Login e senhas incorretos" });
    }
    var token = new TokenGenerator().Generate(user);
    return Ok(token);
  }
}

