using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApi.Models;
using Auth_Service;

namespace AuthControllers
{
    [Authorize]
    [ApiController]
    [Route("authenticate")] 
    public class UsersController : ControllerBase
    {
        protected static string secretKey = "kjvsglmvoixclfsgdfgdfhdhfjzkjererggkmdkrtm5f50imsdfcouza";
        private IAuthService _authFactory;
        public UsersController(IAuthService authFactory)
        {
            _authFactory= authFactory;
        }


        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            
            var user = _authFactory.Authenticate(model.email, model.password); 
            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }
    }
}