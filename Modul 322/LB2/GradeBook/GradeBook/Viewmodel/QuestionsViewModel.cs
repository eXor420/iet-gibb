using GradeBook.model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.System;

namespace GradeBook.Viewmodel
{
    public class QuestionsViewModel
    {
        public ObservableCollection<Question> Questions { get; set; } = new();

        public QuestionsViewModel()
        {
            string[] titles = createTitleArray();
            string[] solutions = createSolutionArray();
            string[] imageNames = createImageNameArray();

            for (int i = 0; i < titles.Length; i++)
            {
                Questions.Add(new Question(titles[i], solutions[i], imageNames[i]));
            }
        }

        private string[] createTitleArray()
        {
            List<string> titles = new List<string>();
            titles.Add("How to create a new Account?");
            titles.Add("How to edit a Account?");
            titles.Add("How to delete a Account?");
            titles.Add("How to see a students grades?");
            titles.Add("How to add a new grade?");
            titles.Add("How to edit a grade?");
            titles.Add("How to delete a grade?");
            titles.Add("How to add a new Subject?");
            titles.Add("How to edit/delete a Subject?");

            return titles.ToArray();
        }
        private string[] createSolutionArray()
        {
            List<string> solutions = new List<string>();
            solutions.Add("1.) Press LogOff in the Navbar. 2.) Click on the Bottom of the LogIn field the create new Account Link. 3.) Create your new Account!");
            solutions.Add("1.) Log in to your Account. 2.) Click on 'Account' in the Navbar. 3.) Edit your Account! 4.) Save your changes with the Save Button! Hint: Editting someone others account is in the newest version of the GradeBook not possible. ");
            solutions.Add("1.) Log in to your Account. 2.) Click on 'Account' in the Navbar. 3.) Use the Garbagecan Icon to delete your account and confirm that you want to delete your Account! Hint delete someone others account is in the newest version of the GradeBook not possible.");
            solutions.Add("1.) Log in to your Account or click on 'Students' in the Navbar. 2.) Choose your Student and click on it. 3.) See its Grades!");
            solutions.Add("1.) Do the same steps as in the Question above. 2.) Click on the plus icon on the right seide from the selected subject. 3.) Add your new Grade!");
            solutions.Add("1.) Do the same steps as in the Question 2 Questions above 2.) Click on the Grade you want to Edit. 3.) Edit your Grade!");
            solutions.Add("1.) Do the same steps as in the Question above. 2.) Click on the Delete Button and confirm that you want to delete this Grade.");
            solutions.Add("1.) Do the same steps as in the Question 4 Questions above. 2.) Click on the top right on the 'Add Subject'-Button. 3.) Add your new Subject!");
            solutions.Add("Unfortunately this feature is not available in the latest version of the GradeBook :( But stay curious, eventually an update will come!");

            return solutions.ToArray();
        }
        private string[] createImageNameArray()
        {
            List<string> imageNames = new List<string>();
            imageNames.Add("new_account.png");
            imageNames.Add("edit_account.png");
            imageNames.Add("delete_account.png");
            imageNames.Add("see_grades.png");
            imageNames.Add("add_grade.png");
            imageNames.Add("edit_grade.png");
            imageNames.Add("delete_grade.png");
            imageNames.Add("add_subject.png");
            imageNames.Add("unavaiable.png");

            return imageNames.ToArray();
        }
    }
}
