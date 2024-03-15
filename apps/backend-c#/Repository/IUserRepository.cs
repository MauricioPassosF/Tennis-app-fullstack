namespace Tennis.Repository;
using Tennis.Models;
using Tennis.DTO;
public interface IUserRepository
{
  UserDTO? GetUserById(int id);
  IEnumerable<UserDTO> GetAllUsers();
  UserDTO AddUser(User user);
}
