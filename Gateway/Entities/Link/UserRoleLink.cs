using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auth_DB_Context
{    
    public class UserRoleLink
    {
        [Key]
        public string apiId { get; set; }

        [ForeignKey("Role")]
        public string user_API_Id { get; set; }
        [ForeignKey("User")]
        public string role_API_Id { get; set; }

        public virtual Role role { get; set; }
        public virtual User user { get; set; } 
    }   
}