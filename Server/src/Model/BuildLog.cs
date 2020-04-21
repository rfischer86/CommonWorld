using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace BuildLogger_DB_Context
{
    
    public class BuildLogFields {
        public static string error  = "error";
        public static string buildStatus  = "buildStatus";
    }
    public class BuildLog
    {   
        public string id { get; set; }
               
        // public date Date { get; set; }
        public string description { get; set; }
        public Nullable<BuildStatus> buildStatus { get; set; }
        [ForeignKey("errorID")]


        public Error error { get; set; }

        public static BuildLogRef toRef (BuildLog buildLog) {
            BuildLogRef buildLogRef = new BuildLogRef();
            buildLogRef.id = buildLog.id;
            buildLogRef.description = buildLog.description;
            buildLogRef.errorId = buildLog.error.id;
            return buildLogRef;
        }
    }    

    public class BuildLogRef
    {   
        public string id { get; set; }
               
        // public date Date { get; set; }
        public string description { get; set; }
        public Nullable<BuildStatus> buildStatus { get; set; }

        public string errorId { get; set; }

        public string projectId { get; set; }
        
        public string serverId { get; set; }


    }    
}
