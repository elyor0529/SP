using System.Web.Mvc;
using System.Web.Routing;

namespace Demo.SP
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        { 
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
        }
    }
}
