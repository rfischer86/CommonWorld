using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auth_DB_Context
{    
    public class GroupRoleLink
    {
        [Key]
        public string apiId { get; set; }

        [ForeignKey("Group")]
        public string groupApiId { get; set; }
        
        [ForeignKey("Role")]
        public string roleApiId { get; set; }
        public Role role { get; set; }
        public Group group { get; set; }
    }   
}