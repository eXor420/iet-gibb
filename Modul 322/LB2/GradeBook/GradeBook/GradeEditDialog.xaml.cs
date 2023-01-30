using CommunityToolkit.Maui.Views;
using Microsoft.Maui.Controls;
namespace GradeBook;

public partial class GradeEditDialog : Popup
{
	public GradeEditDialog(string grade)
	{
		InitializeComponent();
        Grade.Text = grade;
        picker.SelectedIndex= 2;

    }

    private void onCancel(object sender, EventArgs e)
    {
        Close();
    }
    private void onCancelDelete(object sender, EventArgs e)
    {
        delete.IsVisible = false;
        edit.IsVisible = true;
    }

    private void onSave(object sender, EventArgs e)
    {
        //todo save
        Close();
    }
    private void onTryDelete(object sender, EventArgs e)
    {
        edit.IsVisible = false;
        delete.IsVisible = true;
    }
    private void onDelete(object sender, EventArgs e)
    {
        //todo delete
        Close();
    }
}