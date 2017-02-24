using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IndividualProject4.Models
{
    public class QuizList
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string Language { get; set; }

        public ICollection<Pair> Pairs { get; set; }

    }
}
