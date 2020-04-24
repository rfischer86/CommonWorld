using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Auth_DB_Context
{    
    public class User
    {
        [Key]
        public int apiId { get; set; }
        [Required]
        public string name { get; set; }

        [Key]
        [Required]
        public string email { get; set; }
        public string token { get; set; }
        [Required]
        public string password { get; set; }

        public ICollection<Role> roles { get; set; }
    }   
}