using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace IdentityAngular2.DAL
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class User : IdentityUser
    {

        public string firstname { get; set; }
        public string lastname { get; set; }
        public string gender { get; set; }
        public string image { get; set; }
        public string facebookId { get; set; }
        public string twitterId { get; set; }
        public string googleId { get; set; }
        public string deviceId { get; set; }
        public bool isEnabled { get; set; }
        public DateTime insertDate { get; set; }
        public Nullable<DateTime> updateDate { get; set; }
        public Nullable<DateTime> deleteDate { get; set; }
        public bool isDeleted { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext() : base("SwiftConnectionString", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }


    public class Role : IdentityRole
    {
        public Role() : base() { }
        public Role(string name) : base(name)
        {
     
        }
    }
}