using Microsoft.EntityFrameworkCore;
using Helper;
using System.Reflection;

namespace BuildLogger_DB_Context
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
        public static string Error = "Error";
        public static string BuildLog = "BuildLog";
        public static string Nav = "Nav";
    }
    
    public class BuildLoggerContext : DbContext
    {
        public DbSet<Error> Error { get; set; }
        public DbSet<BuildLogRef> BuildLog { get; set; }
        public DbSet<Nav> Nav { get; set; }
        public DbSet<NavNav> NavNav { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NavNav>()
                .HasKey(u => new { u.child_API_Id, u.parent_API_Id });

            // modelBuilder.Entity<Nav>()
            //     .HasMany(u => u.navData)
            //     .WithOne(f => f.child)
            //     .HasForeignKey(f => f.child_API_Id);

            // modelBuilder.Entity<Nav>()
            //     .HasMany(u => u.navParents)
            //     .WithOne(f => f.parent)
            //     .HasForeignKey(f => f.parent_API_Id);
        }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite("Data Source=blogging.db");
    }
}
