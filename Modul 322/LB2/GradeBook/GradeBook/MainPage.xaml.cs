using CommunityToolkit.Maui.Views;
using Windows.Media.Devices;

namespace GradeBook;

public partial class MainPage : ContentPage
{

	public MainPage()
	{
		InitializeComponent();
	}

	private async void OnSubmit(object sender, EventArgs e)
	{
		var amountAccounts = await App.Database.CheckIfAccountIsValid(Username.Text, Password.Text);
        if (amountAccounts > 0) 
		{
			App.LoggedInUserName  = Username.Text;
			Username.Text = App.LoggedInUserName;
			Password.Text = string.Empty;
            errorLabel.TextColor = Color.FromArgb("FFF");
            await Shell.Current.GoToAsync("//Students");
		}
		else
		{
			errorLabel.TextColor = Color.FromArgb("F00");
        }
	}
	private async void onSignUp(object sender, EventArgs e)
	{
			Username.Text = string.Empty;
			Password.Text = string.Empty;
            errorLabel.TextColor = Color.FromArgb("FFF");
            await Shell.Current.GoToAsync("//Account");
	}
}

