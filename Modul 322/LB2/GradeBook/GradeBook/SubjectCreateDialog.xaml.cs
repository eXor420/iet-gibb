using CommunityToolkit.Maui.Views;

namespace GradeBook;

public partial class SubjectCreateDialog : Popup
{
	public SubjectCreateDialog()
	{
		InitializeComponent();
	}

    private void onCancel(object sender, EventArgs e)
    {
        Close();
    }

    private void onSave(object sender, EventArgs e)
    {
        Close();
    }
}