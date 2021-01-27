using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BuildLogger_DB_Context
{
    public enum BuildStatus
    {
        None,
        success = 1,
        error = 2,
        warning = 3
    }
    
}
