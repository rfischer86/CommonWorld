using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auth_DB_Context
{    
    public class RolePrivilegeLink
    {
        [Key]
        public string apiId { get; set; }
        [ForeignKey("Role")]
        public string roleApiId { get; set; }
        [ForeignKey("Privilege")]
        public string prigilegApiId { get; set; }
        public Privilege privilege { get; set; }
        [Required]
        public Role role { get; set; }
    }   
}