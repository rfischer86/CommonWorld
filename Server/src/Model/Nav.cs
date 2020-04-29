using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BuildLogger_DB_Context
{    
    static class NavTypes
    {
        public const string profile = "profile";
        public const string menu = "menue";
    }
    public class Nav
    {
        // public Nav(){
        //     navData = new List<NavNav>();
        //     navParents = new List<NavNav>();
        // }
        [Key]
        public string  apiId { get; set; }
        public string  bodyId { get; set; }
        public int count {get; set;}
        public string link {get; set;}
        public string name { get; set; }
        public string type { get; set; }
        
        public virtual List<Nav> navData { get; set; }
        // public virtual List<NavNav> navParents { get; set; }
    }   

       public class NavNav
    {

        // public NavNav(string child_id, string parent_id){
        //     child_API_Id = child_API_Id;
        //     parent_API_Id = parent_id;
        // } 
        public string child_API_Id { get; set; }
        public string parent_API_Id { get; set; }

        public virtual Nav child { get; set; }
        public virtual Nav parent { get; set; }
    } 
}