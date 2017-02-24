using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IndividualProject4.Data;
using IndividualProject4.Models;
using IndividualProject4.Services;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace IndividualProject4.Controllers
{
    


    [Route("api/languages")]
    public class LanguagesController : Controller
    {
        private ApplicationDbContext _db;

        public LanguagesController(ApplicationDbContext db)
        {
            this._db = db;
        }
        
        // GET: api/values
        [HttpGet]
        public IEnumerable<Language> Get()
        {
            return _db.Languages;
        //    return _langServ.GetAllLanguages();
        }


        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
