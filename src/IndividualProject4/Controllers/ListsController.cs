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



    [Route("api/lists")]
    public class ListsController : Controller
    {
        private ApplicationDbContext _db;

        public ListsController(ApplicationDbContext db)
        {
            this._db = db;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<QuizList> Get()
        {
            return _db.QuizLists;
            //    return _langServ.GetAllLanguages();
        }


        // GET api/values/5
        [HttpGet("{languageRoute}")]
        public IEnumerable<QuizList> Get(string languageRoute)
        {

            return _db.QuizLists.Where(x => x.Language == languageRoute)
                .Select(m =>
                new QuizList
                {
                    Id = m.Id,
                    Topic = m.Topic,
                    Language = m.Language
                }).ToList();
        }

        // POST api/values
        [HttpPost]
        public int Post([FromBody]QuizList value)
        {
           
            _db.QuizLists.Add(value);
            _db.SaveChanges();
            return value.Id;
            
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]QuizList value)
        {
            var origList = _db.QuizLists.FirstOrDefault(x => x.Id == value.Id);
            string origListTopic = origList.Topic;
           
            IEnumerable<Pair> pairs = _db.Pairs.Where(x => x.Language == value.Language &&
                                        x.Topic == origListTopic)
               .Select(y =>
               new Pair
               {
                   Id = y.Id,
                   Topic = value.Topic,
                   Language = y.Language,
                   English = y.English,
                   Target = y.Target
               }).ToList();

            foreach (Pair pair in pairs)
            {
                Pair referencePair = _db.Pairs.FirstOrDefault(x => x.Id == pair.Id);
                referencePair.Topic = value.Topic;
                _db.Update(referencePair);
                _db.SaveChanges();
            }

            QuizList referenceList = _db.QuizLists.FirstOrDefault(x => x.Id == value.Id);
            referenceList.Topic = value.Topic;
            _db.Update(referenceList);
            _db.SaveChanges();

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            QuizList referenceList = _db.QuizLists.FirstOrDefault(x => x.Id == id);
            _db.Remove(referenceList);
     //       _db.SaveChanges();
        }
    }
}
