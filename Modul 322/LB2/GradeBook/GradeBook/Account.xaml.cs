using CommunityToolkit.Maui.Alerts;
using static System.Net.Mime.MediaTypeNames;
using System.Threading;
using CommunityToolkit.Maui.Core;
using Microsoft.Maui.Controls;
using GradeBook.model;
using System.Net.Mail;
using CommunityToolkit.Maui.Views;

namespace GradeBook;

public partial class Account : ContentPage
{
    private User user;
    public Account()
    {
        InitializeComponent();
    }
    private async void navigateToStudents(object sender, EventArgs e)
    {
        
        await Shell.Current.GoToAsync("//Students");
    }
    private async void navigateToAbout(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("//About");
    }
    private async void navigateToFAQ(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("//FAQ");
    }
    private async void navigateToAccount(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("//Account");
    }
    private async void logOut(object sender, EventArgs e)
    {
        App.LoggedInUserName = null;
        await Shell.Current.GoToAsync("//MainPage");
    }

    private async void onCancel(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("//MainPage");
    }
    private void onDelete(object sender, EventArgs e)
    {
        this.ShowPopup(new AccountDeleteConfirmDialog(Name.Text, App.LoggedInUserName));
    }



    protected override async void OnAppearing()
    {
        base.OnAppearing();
        clearFields();
        if (App.LoggedInUserName != null)
        {
            CancelButton.IsVisible= false;
            studentsNav.IsVisible = true;
            accountNav.IsVisible = true;
            aboutNav.IsVisible = true;
            faqNav.IsVisible = true;
            logoutNav.IsVisible = true;
            deleteButton.IsVisible = true;
            var userList = await App.Database.GetByUserName(App.LoggedInUserName);
            user = userList.First();
            Username.Text = user.Username;
            Password.Text = user.Password;
            Name.Text = user.Name;
            Birthday.Date = DateTime.Parse(user.Birthday);
            EMail.Text = user.EMail;
            Phone.Text = user.Phone;
            StreetNumber.Text = user.StreetNumber;
            City.Text = user.City;
            ZipCode.Text = user.ZipCode;
            Title.Text = "Edit " + user.Name;
        }
        else
        {
            CancelButton.IsVisible = true;
            studentsNav.IsVisible = false;
            accountNav.IsVisible = false;
            aboutNav.IsVisible = false;
            faqNav.IsVisible = false;
            logoutNav.IsVisible = false;
            deleteButton.IsVisible = false;
            Title.Text = "Create new Account";
        }
        
    }

    private async void onSave(object sender, EventArgs e)
    {
        var userIsValid = await ValidateFields(Username.Text, Password.Text, Name.Text, EMail.Text, Phone.Text, StreetNumber.Text, City.Text, ZipCode.Text);
        if (userIsValid)
        {


            if (App.LoggedInUserName != null)
            {
                await App.Database.UpdateUser(new model.User
                {
                    Id = user.Id,
                    Username = Username.Text,
                    Password = Password.Text,
                    Name = Name.Text,
                    Birthday = Birthday.Date.ToString(),
                    EMail = EMail.Text,
                    Phone = Phone.Text,
                    StreetNumber = StreetNumber.Text,
                    City = City.Text,
                    ZipCode = ZipCode.Text
                });
                App.LoggedInUserName = Username.Text;
                var toast = Toast.Make("Information was saved :)", ToastDuration.Short, 15);
                await toast.Show();
            }
            else
            {
                await App.Database.SaveUser(new model.User
                {
                    Username = Username.Text,
                    Password = Password.Text,
                    Name = Name.Text,
                    Birthday = Birthday.Date.ToString(),
                    EMail = EMail.Text,
                    Phone = Phone.Text,
                    StreetNumber = StreetNumber.Text,
                    City = City.Text,
                    ZipCode = ZipCode.Text
                });

                var toast = Toast.Make("Account created :)", ToastDuration.Short, 15);
                await toast.Show();
                await Shell.Current.GoToAsync("//MainPage");
            }
        }
        
    }

    private void clearFields()
    {
        Username.Text = string.Empty;
        Password.Text = string.Empty;
        Name.Text = string.Empty;
        Birthday.Date = new DateTime(2000, 1, 1);
        EMail.Text = string.Empty;
        Phone.Text = string.Empty;
        StreetNumber.Text = string.Empty;
        City.Text = string.Empty;
        ZipCode.Text = string.Empty;

        errorUsername.Text = string.Empty;
        errorPassword.Text = string.Empty;
        errorName.Text = string.Empty;
        errorEmail.Text = string.Empty;
        errorPhone.Text = string.Empty;
        errorStreetNumber.Text = string.Empty;
        errorCity.Text = string.Empty;
        errorZipcode.Text = string.Empty;
    }

    public async Task<bool> ValidateFields(string username, string password, string name, string email, string phone, string streetNumber, string city, string zipcode)
    {
        errorUsername.Text = string.Empty;
        errorPassword.Text = string.Empty;
        errorName.Text = string.Empty;
        errorEmail.Text = string.Empty;
        errorPhone.Text = string.Empty;
        errorStreetNumber.Text = string.Empty;
        errorCity.Text = string.Empty;
        errorZipcode.Text = string.Empty;

        // Validate username
        if (username == string.Empty || username == null){
            errorUsername.Text = "Username can't be empty!";
            return false;
        }

        if(username != App.LoggedInUserName)
        {
            var amountAccounts = await App.Database.CheckIfUsernameIsTaken(username);
            if (amountAccounts > 0)
            {
                errorUsername.Text = "Username is allready taken!";
                return false;
            }
        }
        

        if (username.Length < 4)
        {
            errorUsername.Text = "Username must be at least 4 characters!";
            return false;
        }

        // Validate password
        if (password == string.Empty || password == null)
        {
            errorPassword.Text = "Password can't be empty!";
            return false;
        }

        if (password.Length < 8)
        {
            errorPassword.Text = "Password must be at least 8 characters!";
            return false;
        }

        // Validate name
        if (name == string.Empty || name == null)
        {
            errorName.Text = "Name can't be empty!";
            return false;
        }

        string[] nameWords = name.Split(' ');
        if (nameWords.Length < 2)
        {
            errorName.Text = "Name must contain at least 2 'words'!";
            return false;
        }
        foreach (string word in nameWords)
        {
            if (!word.All(char.IsLetter))
            {
                errorName.Text = "Name must only contain letters!";
                return false;
            }
        }

        // Validate email
        if (email == string.Empty || email == null)
        {
            errorEmail.Text = "E-Mail can't be empty!";
            return false;
        }

        try
        {
            MailAddress m = new MailAddress(email);
        }
        catch (FormatException)
        {
            errorEmail.Text = "E-Mail must be an valid e-mail address!";
            return false;
        }

        // Validate phone
        if (phone == string.Empty || phone == null)
        {
            errorPhone.Text = "Phone can't be empty!";
            return false;
        }

        if (!phone.All(c => char.IsDigit(c) || c == '+' || c == ' '))
        {
            errorPhone.Text = "Phone can only contain numbers '+' and spaces";
            return false;
        }

        // Validate street number
        if (streetNumber == string.Empty || streetNumber == null)
        {
            errorStreetNumber.Text = "Street & Number can't be empty!";
            return false;
        }
        if (!(streetNumber.Any(char.IsLetter) && streetNumber.Any(char.IsDigit)))
        {
            errorStreetNumber.Text = "Street & Number must contain a street and a number!";
            return false;
        }

        // Validate city
        if (city == string.Empty || city == null)
        {
            errorCity.Text = "City can't be empty!";
            return false;
        }

        if (city.Length < 3)
        {
            errorCity.Text = "City must contain at least 3 characters!";
            return false;
        }
        if (!city.All(char.IsLetter))
        {
            errorCity.Text = "City must only contain letters!";
            return false;
        }

        // Validate zipcode
        if (zipcode == string.Empty || zipcode == null)
        {
            errorZipcode.Text = "Zipcode can't be empty!";
            return false;
        }

        if (!zipcode.All(char.IsDigit) && !zipcode.Contains("-"))
        {
            errorZipcode.Text = "Zipcode can only contain numbers and '-'!";
            return false;
        }

        // If all validation checks pass, return true
        return true;
    }
}