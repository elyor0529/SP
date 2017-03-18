using System.ComponentModel.DataAnnotations;

namespace Demo.SP.ViewModels.Account
{
    public class RegisterExternalBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}