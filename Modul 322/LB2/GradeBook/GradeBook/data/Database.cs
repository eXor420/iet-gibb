using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GradeBook.model;
using Microsoft.UI.Xaml.Controls;
using SQLite;

namespace GradeBook.data
{
    public class Database
    {
        private readonly SQLiteAsyncConnection _database;

        public Database(string dbPath) 
        { 
            _database= new SQLiteAsyncConnection(dbPath);
            _database.CreateTableAsync<User>().Wait();
        }

        public Task<List<User>> GetAll()
        {
            return _database.Table<User>().ToListAsync();
        }
        public Task<int> SaveUser(User user)
        {
            return _database.InsertAsync(user);
        }
        public Task<int> UpdateUser(User user)
        {
            return _database.UpdateAsync(user);
        }

        public Task<int> CheckIfAccountIsValid(string Username, string Password)
        {
            return _database.Table<User>().Where(table => table.Username == Username).Where(table => table.Password == Password).CountAsync();
        }
        public Task<int> CheckIfUsernameIsTaken(string Username)
        {
            return _database.Table<User>().Where(table => table.Username == Username).CountAsync();
        }

        public Task<List<User>> GetByUserName(string Username)
        {
            return _database.Table<User>().Where(table => table.Username == Username).ToListAsync();
        }

        public async void DeleteByUserName(string Username)
        {
            var users = await _database.Table<User>().Where(table => table.Username == Username).ToListAsync();


            foreach (User user in users)
            {
                await _database.DeleteAsync(user);
            }
            
            
        }


    }
}
