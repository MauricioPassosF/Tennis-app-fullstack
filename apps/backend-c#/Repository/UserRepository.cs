using Tennis.Models;

namespace Tennis.Repository;

public class UserRepository : IUserRepository
{
  protected readonly ITennisContext _context;
  public UserRepository(ITennisContext context)
  {
    _context = context;
  }

  public User? GetUserById(int id)
  {
    return _context.Users.FirstOrDefault(user => user.UserId == id);
  }

  public IEnumerable<User> GetAllUsers()
  {
    return _context.Users;
  }

  public User AddUser(User user)
  {
    _context.Users.Add(user);
    _context.SaveChanges();
    return user;
  }
}