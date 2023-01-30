using GradeBook.model;
using GradeBook.Viewmodel;

namespace GradeBook;


public partial class Students : ContentPage
{
    public Students()
	{
		InitializeComponent();
        BindingContext= new UsersViewModel();
    }

    protected override void OnNavigatedTo(NavigatedToEventArgs args)
    {
        base.OnNavigatedTo(args);
        BindingContext = new UsersViewModel();
    }

    private async void onStudentSelected(object sender, EventArgs e)
    {
        Border border = (Border)sender;
        User user = (User)border.BindingContext;
        string username = user.Username;
        await Shell.Current.GoToAsync("StudentDetail?username="+username);
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