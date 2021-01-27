using Microsoft.AspNetCore.Mvc;
using Helper;
using Nav_Factory;
using BuildLogger_DB_Context;

namespace BuildLogger_ErrorControler
{   

    [ApiController]
    [Route("api/nav")]
    public class NavController: ControllerBase
    {
        private NavFactory factory = new NavFactory();

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Nav> GetById(string id)
        {   
            ServerResult<Nav> sr = factory.getById(id, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult Post(Nav entity)
        {
            ServerResult<Nav> sr = factory.create(entity, true);
            if (sr.success) 
            {
                return Created("api/nav/" + sr.result.apiId, sr);
            } else
            {
                return BadRequest(sr);
            }
        }


        [HttpPut]
        [Route("{parentId}/add/{childId}")]
        public ActionResult AddItem(string parentId, string childId)
        {
            ServerResult<Nav> sr = factory.addNavItem(parentId , childId, 0, true);
            if (sr.success)
            {
                return Ok(sr);
            } else
            {
                return BadRequest(sr);
            }
         }


        [HttpDelete]
        [Route("{parentId}/remove/{childId}")]
        public ActionResult RemoveItem(string parentId, string childId)
        {
            ServerResult<Nav> sr = factory.removeNavItem(parentId , childId, true);
            if (sr.success)
            {
                return Ok(sr);
            } else
            {
                return BadRequest(sr);
            }
         }

        [HttpPut]
        public ActionResult Put(Nav entity)
        {
            ServerResult<Nav> sr = factory.update(entity, true);
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
        public ActionResult Delete(string id)
        {
            ServerResult<Nav> sr = factory.deleteById(id, true);
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
