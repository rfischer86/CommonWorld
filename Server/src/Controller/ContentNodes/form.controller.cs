using Microsoft.AspNetCore.Mvc;
using Helper;
using Form_Factory;
using BuildLogger_DB_Context;
using WebApi.Models;
using System.Collections.Generic;


namespace BuildLogger_ErrorControler
{   

    [ApiController]
    [Route("api/content/formulars")]
    public class FormController: ControllerBase
    {
        private FormFactory factory = new FormFactory();

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Form> GetById(string id)
        {   
            ServerResult<Form> sr = factory.getById(id, false);
            if (sr.success)
            {
                return Ok(sr);
            } else 
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult Post(Form entity)
        {
            ServerResult<Form> sr = factory.create(entity, true);
            if (sr.success) 
            {
                return Created("api/form/" + sr.result.apiId, sr);
            } else
            {
                return BadRequest(sr);
            }
        }


        [HttpPut]
        public ActionResult Put(Form entity)
        {
            ServerResult<Form> sr = factory.update(entity, true);
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
            ServerResult<Form> sr = factory.deleteById(id, true);
            if (sr.success)
            {
                return Ok(sr);
            } else
            {
                return BadRequest(sr);
            }
         }


        [HttpPost]
        [Route("search")]
        public ActionResult Post(SearchModel searchData)
        {
            Helper.Helper.print("sr");
            ServerResult<List<Form>> sr = factory.search(searchData, true);
            Helper.Helper.printObject(sr);
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
