using CommunityToolkit.Maui.Views;

namespace GradeBook;

public partial class GradeCreateDialog : Popup
{
	public GradeCreateDialog()
	{
		InitializeComponent();
        picker.SelectedIndex = 2;

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