using System.Configuration;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Demo.SP.Models;
using Microsoft.AspNet.Identity.Owin;

namespace Demo.SP.Controllers
{
    [EnableCors("*", "*", "*")]
    [Authorize]
    public abstract class BaseController : ApiController
    {
        private ApplicationDbContext _db;
        private ApplicationUserManager _userManager;
         
        protected BaseController()
        {

        }

        protected BaseController(ApplicationDbContext db, ApplicationUserManager userManager)
        {
            _db = db;
        }

        protected ApplicationUserManager UserManager
        {
            get { return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
        }

        protected ApplicationDbContext Db
        {
            get { return _db ?? Request.GetOwinContext().GetUserManager<ApplicationDbContext>(); }
            private set { _db = value; }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_db != null)
                {
                    _db.Dispose();
                    _db = null;
                }
            }

            base.Dispose(disposing);
        }

    }
}