using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Auth_DB_Context
{    
    public enum RoleType
    {
        None,
        single = 1,
        many = 2,
        infinit = 3
    }
    public class Role
    {
        [Key]
        public string  apiId { get; set; }
        
        [Required]
        public RoleType roleType { get; set; }
        [Required]
        public string name { get; set; }
        
        [Required]
        public Privilege defaultPrivilege { get; set; }
        
    }
}