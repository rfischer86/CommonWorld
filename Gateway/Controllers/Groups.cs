using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Auth_DB_Context;
using Group_Factory;
using WebApi.Models;
using System.Collections.Generic;

namespace GroupController
{
    [Authorize]
    [ApiController]
    [Route("groups")]
    public class GroupsController : ControllerBase
    {
        private GroupFactory factory = new GroupFactory();

        [HttpGet]
        [Route("{id}")]
        public ActionResult get(string id)
        {
            ServerResult<Group> sr = factory.getById(id, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return BadRequest(sr);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult create(Group entity)
        {
            ServerResult<Group> sr = factory.create(entity, true);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return BadRequest(sr);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult delete(string id)
        {
            ServerResult<Group> sr = factory.deleteById(id, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return BadRequest(sr);
            }
        }
        [HttpPut]
        public IActionResult put(Group entity)
        {

            ServerResult<Group> sr = factory.update(entity, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return NotFound();
            }
        }
        
        [HttpPost]
        [AllowAnonymous]
        [Route("search")]
        public IActionResult search(SearchModel searchData)
        {
            ServerResult<List<Group>> sr = factory.search(searchData, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return BadRequest(sr);
            }        
        }
    }
}