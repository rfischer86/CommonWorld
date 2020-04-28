using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Auth_DB_Context
{    
    public class User
    {
        [Key]
        public string apiId { get; set; }
        [Required]
        public string name { get; set; }

        [Required]
        public string email { get; set; }
        public string token { get; set; }
        [Required]
        public string password { get; set; }

        public ICollection<Role> roles { get; set; }
    }   
}