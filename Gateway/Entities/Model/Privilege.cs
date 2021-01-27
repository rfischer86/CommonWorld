using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Auth_DB_Context
{    
    public class Privilege
    {
        [Key]
        public string  apiId { get; set; }
                     
        [Required]
        public string  privilegeOfApiId { get; set; }
        
        [Required]
        public bool changePrivilege { get; set; }
        
        [Required]
        public bool read { get; set; }
        
        [Required]
        public bool write { get; set; }
        
        [Required]
        public bool add { get; set; }
        
        [Required]
        public bool delete { get; set; }
    }
}