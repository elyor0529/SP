﻿using System;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Demo.SP
{
    public class WebApiApplication : HttpApplication
    { 
        protected void Application_Start(object sender, EventArgs e)
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(ApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }  
    }
}
