namespace Tennis.Repository;
using Tennis.Models;

public interface IUserRepository
{
  User? GetUserById(int id);
  IEnumerable<User> GetAllUsers();
  User AddUser(User user);
}
