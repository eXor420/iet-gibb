namespace GradeBook;

public partial class AppShell : Shell
{
	public AppShell()
	{
		InitializeComponent();
        Routing.RegisterRoute("MainPage", typeof(MainPage));
        Routing.RegisterRoute("Students", typeof(Students));
		Routing.RegisterRoute("StudentDetail", typeof(StudentDetail));
		Routing.RegisterRoute("Account", typeof(Account));
		Routing.RegisterRoute("FAQ", typeof(FAQ));
		Routing.RegisterRoute("About", typeof(About));
	}
}
