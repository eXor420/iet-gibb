using GradeBook.model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GradeBook.Viewmodel
{
    public class UsersViewModel
    {
        public ObservableCollection<User> Users { get; set; } = new();

        public UsersViewModel()
        {
            GetUseresAsync();
        }

        public async Task GetUseresAsync()
        {

            var users = await App.Database.GetAll();
            foreach (var user in users)
            {
                Users.Add(user);
            }
        }
    }
}
