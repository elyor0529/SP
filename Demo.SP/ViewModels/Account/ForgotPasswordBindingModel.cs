using System.ComponentModel.DataAnnotations;

namespace Demo.SP.ViewModels.Account
{
    public class ForgotPasswordBindingModel
    {

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string CallbackUrl { get; set; }

    }
}