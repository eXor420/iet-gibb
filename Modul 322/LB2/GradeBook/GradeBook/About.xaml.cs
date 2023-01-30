namespace GradeBook;

public partial class About : ContentPage
{
	public About()
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
}