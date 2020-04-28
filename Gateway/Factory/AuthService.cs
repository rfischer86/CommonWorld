using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Auth_DB_Context;
using WebApi.Helpers;

namespace Auth_Service
{    public interface IAuthService
    {
        ServerResult<Auth_DB_Context.User> Authenticate(string username, string password);
    }

    public class AuthService : IAuthService
    {

        private AuthContext db = new AuthContext();
        
        private AppSettings _appSettings;

        public AuthService( IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }
        public ServerResult<Auth_DB_Context.User> Authenticate(string email, string password)
        {
            ServerResult<Auth_DB_Context.User> sr = ServerResult<Auth_DB_Context.User>.create();
            try{
                sr.result = db.User.Where(x => x.email == email && x.password == password).First();
            } catch {
                sr.error.addMessage(Helper.HttpError.getIdNotExist(TabelList.User, email));
                return sr;
            }
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, sr.result.apiId),
                    new Claim("Role", "Admin"),
                    new Claim(ClaimTypes.Country, "DE")
                }), 
		        Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            sr.result.token = tokenHandler.WriteToken(token);
            sr.result.WithoutPassword();
            return sr;
        }
    }
}