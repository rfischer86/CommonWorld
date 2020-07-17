using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BuildLogger_DB_Context
{    
    static class NavTypes
    {
        public const string profile = "profile";
        public const string menu = "menu";
        public const string roles = "roles";
        public const string groups = "groups";
        public const string todo = "todo";
        public const string dates = "dates";
        public const string decisions = "decisions";
        public const string email = "email";
        public const string feed = "feed";
    }
    public class Nav
    {
        // public Nav(){
        //     navData = new List<NavNav>();
        //     navParents = new List<NavNav>();
        // }
        [Key]
        public string  apiId { get; set; }
        public string state { get; set; }
        public string link {get; set;}
        public string name { get; set; }
        public string type { get; set; }
        public string contentType { get; set; }
        [NotMapped]
        public object contentData { get; set; }
        
        public virtual List<Nav> navData { get; set; }
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