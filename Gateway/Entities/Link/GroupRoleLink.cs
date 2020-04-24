using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Auth_DB_Context
{    
    public class GroupRoleLink
    {
        [Required]
        public string groupApiId { get; set; }
        [Required]
        public string roleApiId { get; set; }
        public Role role { get; set; }
        public Group group { get; set; }
    }   
}