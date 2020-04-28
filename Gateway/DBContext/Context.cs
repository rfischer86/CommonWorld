using Microsoft.EntityFrameworkCore;
using Helper;
using System.Reflection;

namespace Auth_DB_Context
{
    public class ServerResult<T>
    {
        public ErrorMsg error { get; set; }
        public T result { get; set; }

        public bool success {get; set; }

        public static ServerResult<T> create() {
            ServerResult<T> sr  = new ServerResult<T>();
            sr.error = new ErrorMsg();
            sr.success = true;
            return sr; 
        }
        public ServerResult<T> contatenate< T, V>( ServerResult<T> mainSR, ServerResult<V> subSR) 
        {
            PropertyInfo[] mainProperties = typeof(T).GetProperties();
            foreach (PropertyInfo property in mainProperties)
            {
                if (property.PropertyType.ToString() == typeof(V).ToString()) {
                    property.SetValue(mainSR.result, subSR.result as object, null);
                }
            }
            foreach (var errorMsg in subSR.error.messageList) {
                mainSR.error.addMessage(errorMsg, true);
            }
            if (!mainSR.success || !subSR.success) {
                mainSR.success = false;
            }
            return mainSR;
        }
        public void fail() {
            success = false;
        }
        public void succeed() {
            success = true;
        }
    }

    public static class TabelList{
        public static string User = "User";
        public static string Group = "Group";
        public static string Role = "Role";
        public static string Privilege = "Privilege";
        public static string UserRoleLink = "UserRoleLink";
        public static string RolePrivilegeLink = "RolePrivilegeLink";
        public static string GroupRoleLink = "GroupRoleLink";
    }
    
    public class AuthContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<GroupRoleLink> GroupRoleLink { get; set; }
        public DbSet<UserRoleLink> UserRoleLink { get; set; }
        public DbSet<RolePrivilegeLink> Privilege { get; set; }
       protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GroupRoleLink>()
                .HasKey(u => new { u.apiId });
            modelBuilder.Entity<RolePrivilegeLink>()
                .HasKey(u => new { u.apiId });
            modelBuilder.Entity<GroupRoleLink>()
                .HasKey(u => new { u.apiId });

        
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=blogging.db");
    }
}
