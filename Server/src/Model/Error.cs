using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System;

namespace BuildLogger_DB_Context
{    
    public class Error
    {
        public string id { get; set; }
        public string code { get; set; }
        public string description {get ; set; }
    }

    
}