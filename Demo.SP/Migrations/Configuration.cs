using System.Data.Entity.Migrations;
using Demo.SP.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.DataProtection;

namespace Demo.SP.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    { 
        private const string DEFAULT_USR= "test@test.com";
        private const string DEFAULT_PSW = "123456";

        public Configuration()
        {
            //config
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true; 
        }

        protected override void Seed(ApplicationDbContext context)
        {

            //users
            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(context),new DpapiDataProtectionProvider());

            var user = userManager.FindById(DEFAULT_USR);
            if (user == null)
            {
                user = new ApplicationUser
                {
                    Email = DEFAULT_USR,
                    UserName = DEFAULT_USR,
                    EmailConfirmed = true,
                    LockoutEnabled = false
                };
                userManager.Create(user, DEFAULT_PSW);
            }

            context.SaveChanges();

            base.Seed(context);
        }
    }
}