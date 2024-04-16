using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Tennis.DTO;
using Tennis.Models;

namespace Tennis.Services;

public class TokenGenerator
{
  private string secret = "testetestetesteTESTE";

  public string Generate(UserDTO user)
  {
    var tokenHandler = new JwtSecurityTokenHandler();
    var tokenDescriptor = new SecurityTokenDescriptor()
    {
      SigningCredentials = new SigningCredentials(
        new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret)),
        SecurityAlgorithms.HmacSha256Signature
      ),
      Expires = DateTime.Now.AddDays(1),
      Subject = this.AddClaims(user)
    };
    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
  }

  private ClaimsIdentity AddClaims(UserDTO user)
  {
    ClaimsIdentity claims = new();
    Claim userEmail = new(ClaimTypes.Email, user.email);
    Claim userId = new(ClaimTypes.NameIdentifier, user.userId.ToString());
    Claim userFirstName = new(ClaimTypes.GivenName, user.firstName);
    Claim userLastName = new(ClaimTypes.Surname, user.lastName);

    claims.AddClaim(userEmail);
    claims.AddClaim(userId);
    claims.AddClaim(userFirstName);
    claims.AddClaim(userLastName);

    return claims;
  }
}

