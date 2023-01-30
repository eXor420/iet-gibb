using GradeBook.data;
using Microsoft.UI;
using Microsoft.UI.Windowing;
using System.IO;
using Windows.Graphics;

namespace GradeBook;

public partial class App : Application
{
	private static Database database;
	private static string loggedInUserName;

	public static Database Database
	{
		get
		{
			if (database == null)
			{
				database = new Database(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "gradebook_users.db3"));
			}
			return database;
		}
	}
	public static string LoggedInUserName
	{
		get
		{
			return loggedInUserName;
		}
		set
		{
			loggedInUserName = value;
		}
	}
    public App()
	{
		InitializeComponent();

        MainPage = new AppShell();
	}
}
