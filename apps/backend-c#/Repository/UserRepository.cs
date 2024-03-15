using Tennis.DTO;
using Tennis.Models;

namespace Tennis.Repository;

public class UserRepository : IUserRepository
{
  protected readonly ITennisContext _context;
  public UserRepository(ITennisContext context)
  {
    _context = context;
  }

  public UserDTO? GetUserById(int id)
  {
    var user = _context.Users
    .FirstOrDefault(user => user.UserId == id);
    if (user == null) { return null; };
    return new UserDTO
    {
      userId = user.UserId,
      firstName = user.FirstName,
      lastName = user.LastName,
      email = user.Email
    };
  }

  public IEnumerable<UserDTO> GetAllUsers()
  {
    return _context.Users.Select(user => new UserDTO
    {
      userId = user.UserId,
      firstName = user.FirstName,
      lastName = user.LastName,
      email = user.Email
    }).ToList();
  }

  public UserDTO AddUser(User user)
  {
    _context.Users.Add(user);
    _context.SaveChanges();
    return new UserDTO
    {
      userId = user.UserId,
      firstName = user.FirstName,
      lastName = user.LastName,
      email = user.Email
    };
  }
}