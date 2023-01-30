using CommunityToolkit.Maui.Views;
using GradeBook.model;

namespace GradeBook;

[QueryProperty(nameof(username), "username")]
public partial class StudentDetail : ContentPage
{
    public string username { get; set; }
    public User user;
	public StudentDetail()
	{
		InitializeComponent();
	}

    private void onCreateNewSubject(object sender, EventArgs e)
    {
        this.ShowPopup(new SubjectCreateDialog());
    }
    private void onCreateNewGrade(object sender, EventArgs e)
    {
        this.ShowPopup(new GradeCreateDialog());
    }
    private void onEditGrade(object sender, EventArgs e)
    {
        Label border = (Label)sender;
        string grade = border.Text;
        this.ShowPopup(new GradeEditDialog(grade));
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

    protected override async void OnAppearing()
    {
        base.OnAppearing();
        var userList = await App.Database.GetByUserName(username);
        user = userList.First();
        StudentName.Text = user.Name;
    }
}