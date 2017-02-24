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



    [Route("api/pairs")]
    public class PairsController : Controller
    {
        private ApplicationDbContext _db;

        public PairsController(ApplicationDbContext db)
        {
            this._db = db;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Pair> Get()
        {
            return _db.Pairs;
            //    return _langServ.GetAllLanguages();
        }


        // GET api/values/5
        [HttpGet("{languageRoute}/{topicRoute}")]
        public IEnumerable<Pair> Get(string languageRoute, string topicRoute)
        {
           
            return _db.Pairs.Where(x => x.Language == languageRoute &&
                                         x.Topic == topicRoute)
                .Select(m => 
                new  Pair {
                    Id = m.Id,
                    Topic = m.Topic,
                    Language = m.Language,
                    English = m.English,
                    Target = m.Target }).ToList();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Pair value)
        {
            _db.Pairs.Add(value);
            _db.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Pair value)
        {
            Pair pairToUpdate = _db.Pairs.FirstOrDefault(x => x.Id == id);

            pairToUpdate.English = value.English;
            pairToUpdate.Target = value.Target;

            _db.Pairs.Update(pairToUpdate);
            _db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Pair deletePair = _db.Pairs.FirstOrDefault(x => x.Id == id);
            _db.Remove(deletePair);
            _db.SaveChanges();
        }
    }
}
