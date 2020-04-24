using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Auth_DB_Context
{    
    public class RolePrivilegeLink
    {
        [Required]
        public string roleApiId { get; set; }
        [Required]
        public string prigilegApiId { get; set; }
        public Privilege privilege { get; set; }
        [Required]
        public Role role { get; set; }
    }   
}