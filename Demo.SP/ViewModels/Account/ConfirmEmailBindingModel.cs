using System.ComponentModel.DataAnnotations;

namespace Demo.SP.ViewModels.Account
{
    public class ConfirmEmailBindingModel
    {

        [Required]
        public string Email { get; set; }

        [Required]
        public string Token { get; set; }

    }
}