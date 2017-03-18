using System.ComponentModel.DataAnnotations;

namespace Demo.SP.ViewModels.Account
{
    public class UserInfoViewModel
    {

        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "First Name")]
        [DataType(DataType.Text)]
        public string FirstName { get; set; }

        [Display(Name = "Last Name")]
        [DataType(DataType.Text)]
        public string LastName { get; set; }

        [Display(Name = "Title")]
        [DataType(DataType.Text)]
        public string Title { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Phone")]
        public string Phone { get; set; }

        [DataType(DataType.MultilineText)]
        [Display(Name = "Address")]
        public string Address { get; set; }

        public bool HasRegistered { get; set; }

        public string LoginProvider { get; set; }
    }
}