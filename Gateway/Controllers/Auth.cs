using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApi.Models;
using System.Linq;
using Auth_DB_Context;
using User_Factory;
using Auth_Service;
using Helper;
using WebApi.Helpers;
using Microsoft.Extensions.Options;

namespace AuthControllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")] 
    public class UsersController : ControllerBase
    {
        protected static string secretKey = "kjvÖlmvoixclkmdkrtm56+50imsdfcouza";
        private AuthService authFactory = new AuthService(secretKey);

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var user = authFactory.Authenticate(model.Username, model.Password);         
            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }
    }
}