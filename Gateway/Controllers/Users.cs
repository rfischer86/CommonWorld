using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Auth_DB_Context;
using User_Factory;
using System.Linq;
using Helper;

namespace UserController
{
    [Authorize]
    [ApiController]
    [Route("[controller]")] 
    public class UsersController : ControllerBase
    {
        private UserFactory factory = new UserFactory();

        [HttpGet]
        [Route("{id}")]
        public IActionResult get(string id)
        {
            ServerResult<User> sr = factory.getById(id, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return NotFound();
            }
        }

        
        [HttpPost]
        public IActionResult create(User entity)
        {
            ServerResult<User> sr = factory.create(entity, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return NotFound();
            }
        }
        
        [HttpDelete]
        [Route("{id}")]
        public IActionResult delete(string id)
        {
            ServerResult<User> sr = factory.deleteById(id, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return NotFound();
            }
        }

        [HttpPut]
        public IActionResult put(User entity)
        {

            ServerResult<User> sr = factory.update(entity, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return NotFound();
            }
        }
        
        [HttpPost]
        [Route("search")]
        public IActionResult search(User entity)
        {

            ServerResult<User> sr = factory.search(entity, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return BadRequest(sr);
            }        }
    }
}