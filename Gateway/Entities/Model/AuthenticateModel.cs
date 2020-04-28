using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}