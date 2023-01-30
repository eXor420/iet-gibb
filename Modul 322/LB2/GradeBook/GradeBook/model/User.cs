using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GradeBook.model
{
    public class User
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Birthday { get; set; }
        public string EMail { get; set; }
        public string Phone { get; set; }
        public string StreetNumber { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
    }
}
