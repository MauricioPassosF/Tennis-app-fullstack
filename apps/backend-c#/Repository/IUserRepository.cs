namespace Tennis.Repository;
using Tennis.Models;
using Tennis.DTO;
public interface IUserRepository
{
  UserDTO? GetUserById(int id);
  UserDTO? GetUserByEmail(string email);
  IEnumerable<UserDTO> GetAllUsers();
  UserDTO AddUser(User user);
  IEnumerable<TournamentInfoDTO>? GetUserTournaments(int userId);
  UserDTO? Login(LoginDto loginInfo);
}
