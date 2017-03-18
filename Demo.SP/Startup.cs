using System.Data.Entity;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.WebApi;
using Demo.SP;
using Demo.SP.Migrations;
using Demo.SP.Models;
using Demo.SP.Providers;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.DataProtection;
using Microsoft.Owin.Security.OAuth;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace Demo.SP
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //migare db
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, Configuration>());

            //autofact
            var builder = new ContainerBuilder();
            builder.RegisterType<ApplicationDbContext>().AsSelf().InstancePerRequest();
            builder.RegisterType<ApplicationUserStore>().As<IUserStore<ApplicationUser>>().InstancePerRequest();
            builder.RegisterType<ApplicationUserManager>().AsSelf().InstancePerRequest();
            builder.Register(c => HttpContext.Current.GetOwinContext().Authentication).InstancePerRequest();
            builder.Register(c => app.GetDataProtectionProvider()).InstancePerRequest();
            builder.RegisterApiControllers(typeof(WebApiApplication).Assembly);
            var container = builder.Build();
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);


            //auth   
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            var oAuthOptions = new OAuthAuthorizationServerOptions
            {
                Provider = new ApplicationOAuthProvider("self"),
                AuthorizeEndpointPath = new PathString("/api/Account/Login")
            };
            app.UseOAuthBearerTokens(oAuthOptions);

        }
    }
}
