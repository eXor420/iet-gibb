using CommunityToolkit.Maui.Views;

namespace GradeBook;

public partial class AccountDeleteConfirmDialog : Popup
{
    public string Username;
	public AccountDeleteConfirmDialog(string name, string username)
	{
		InitializeComponent();
        Username = username;
        title.Text = name +"'s account?";
	}

    private void onCancel(object sender, EventArgs e)
    {
        Close();
    }

    private async void onDelete(object sender, EventArgs e)
    {
        App.Database.DeleteByUserName(Username);
        await Shell.Current.GoToAsync("//MainPage");
    }
}