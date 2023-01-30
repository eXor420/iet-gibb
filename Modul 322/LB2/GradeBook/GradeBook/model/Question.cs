using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GradeBook.model
{
    public class Question
    {
        public Question(string title, string solution, string imageName) 
        { 
            Title= title;
            Solution= solution;
            ImageName= imageName;
        }
        public string Title { get; set; }
        public string Solution { get; set; }
        public string ImageName { get; set; }
    }
}
