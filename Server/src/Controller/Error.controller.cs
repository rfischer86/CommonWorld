using Microsoft.AspNetCore.Mvc;
using Helper;
using Error_Factory;
using BuildLogger_DB_Context;

namespace BuildLogger_ErrorControler
{   

    [ApiController]
    [Route("api/error")]
    public class ErrorController: ControllerBase
    {
        private ErrorFactory errorFactory = new ErrorFactory();

        [HttpGet]
        [Route("{errorId}")]
        public ActionResult<Error> GetById(string errorId)
        {   
            ServerResult<Error> sr = errorFactory.getById(errorId, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("code/{code}")]
        public ActionResult<Error> GetByParams(string code)
        {   
            ServerResult<Error> sr = errorFactory.getByCode(code, true);
            if (sr.success) 
            {
                return Ok(sr);
            } else 
            {
                return NotFound();
            }
        }
        
        [HttpPost]
        public ActionResult Post(Error error)
        {
            ServerResult<Error> sr = errorFactory.create(error, true);
            if (sr.success) 
            {
                return Created("api/error/" + sr.result.id, sr);
            } else
            {
                return BadRequest(sr);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Delete(string id)
        {
            ServerResult<Error> sr = errorFactory.deleteById(id, true);
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
