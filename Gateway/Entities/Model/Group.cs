using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Auth_DB_Context
{    
    public class Group
    {
        [Key]
        public string  apiId { get; set; }
        public string name { get; set; }
    }
}