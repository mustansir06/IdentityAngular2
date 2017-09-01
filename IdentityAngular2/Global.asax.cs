using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using IdentityAngular2.DAL;

namespace IdentityAngular2
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            var userManager = new UserManager<User>(new UserStore<User>(new ApplicationDbContext()));
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));
            var context = new ApplicationDbContext();

            try
            {
                if (!roleManager.RoleExists(Enums.Role.Admin.ToString()))
                {
                    roleManager.Create(new Role(Enums.Role.Admin.ToString()));
                }
                if (!roleManager.RoleExists(Enums.Role.Retailer.ToString()))
                {
                    roleManager.Create(new Role(Enums.Role.Retailer.ToString()));
                }
                if (!roleManager.RoleExists(Enums.Role.User.ToString()))
                {
                    roleManager.Create(new Role(Enums.Role.User.ToString()));
                }

                if (userManager.FindByEmail("admin@swiftshopper.com") == null)
                {
                    var user = new User() { UserName = "admin@swiftshopper.com", Email = "admin@swiftshopper.com", PhoneNumber = "1234567", firstname = "Super", lastname = "Admin", gender = "male", insertDate = DateTime.Now, isDeleted = false  };
                    IdentityResult result = userManager.Create(user, "admin@123");
                    userManager.AddToRole(user.Id, Enums.Role.Admin.ToString());
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
