using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BuildLogger_DB_Context
{    
    public class Role
    {
        [Key]
        public string  apiId { get; set; }
        
        [Required]
        public string name { get; set; }
        [Required]
        public Privilege defaultPrivilege { get; set; }
        
    }
    public class Privilege
    {
        [Key]
        public string  apiId { get; set; }
               
        [Required]
        public string  roleApiId { get; set; }
        
        [Required]
        public string  entityApiId { get; set; }
        
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