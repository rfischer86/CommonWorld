using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BuildLogger_DB_Context
{    
    public class Text
    {
        [Key]
        public string apiId { get; set; }
        public string contentData { get; set; }        
    }   
}