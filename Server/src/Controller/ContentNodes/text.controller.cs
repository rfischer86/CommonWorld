using Microsoft.AspNetCore.Mvc;
using Helper;
using Text_Factory;
using BuildLogger_DB_Context;

namespace BuildLogger_ErrorControler
{   

    [ApiController]
    [Route("api/content/text")]
    public class TextController: ControllerBase
    {
        private TextFactory factory = new TextFactory();

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Text> GetById(string id)
        {   
            ServerResult<Text> sr = factory.getById(id, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult Post(Text entity)
        {
            ServerResult<Text> sr = factory.create(entity, true);
            if (sr.success) 
            {
                return Created("api/text/" + sr.result.apiId, sr);
            } else
            {
                return BadRequest(sr);
            }
        }


        [HttpPut]
        public ActionResult Put(Text entity)
        {
            Helper.Helper.printObject(entity);
            Helper.Helper.print("entity");
            ServerResult<Text> sr = factory.update(entity, true);
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
            ServerResult<Text> sr = factory.deleteById(id, true);
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
