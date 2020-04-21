using Microsoft.AspNetCore.Mvc;
using Error_Factory;
using Helper;
using BuildLogger_DB_Context;
using BuildLog_Factory;

namespace BuildLogger
{   
    [ApiController]
    [Route("api/buildLog")]
    public class BuildLogController: ControllerBase
    {

        private BuildLogFactory buildLogFactory = new BuildLogFactory();
        private ErrorMsg errorMsg;
        private BuildLog buildLog;
        private ErrorFactory errorFactory;

        [HttpGet]
        [Route("{id}")]
        public ActionResult<ServerResult<BuildLog>> Get(string id)
        {   
            ServerResult<BuildLog> sr = buildLogFactory.getById(id);
            if (sr.success)
            {   
                return Ok(sr);
            } else 
            {
                return NotFound(sr);
            }
        }
        
        [HttpPost]
        public ActionResult<ServerResult<BuildLog>> Post(BuildLog entity)
        {
            ServerResult<BuildLog> sr = buildLogFactory.create(entity);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return Conflict(sr);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult<ServerResult<BuildLog>> Delete(string id)
        {
            using (var db = new BuildLoggerContext()) 
            {   
                ServerResult<BuildLog> sr = buildLogFactory.deleteById(id);
                if (sr.success)
                {
                    return Ok(sr);
                } else {
                    return Conflict(sr);
               }
            }
        }
    }
}
