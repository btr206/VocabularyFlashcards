using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IndividualProject4.Models
{
    public class Language
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FlagPath { get; set; }
        public ICollection<QuizList> QuizLists { get; set; }

    }
}
