using System.ComponentModel.DataAnnotations;

namespace Demo.SP.ViewModels.Account
{
    public class VerificationEmailBindingModel
    {

        [Required]
        public string Email { get; set; }

        public string CallbackUrl { get; set; }
    }
}