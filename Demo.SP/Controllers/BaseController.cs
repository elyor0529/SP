using System.Configuration;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Demo.SP.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace Demo.SP.Controllers
{
    [EnableCors("*", "*", "*")]
    [Authorize]
    public abstract class BaseController : ApiController
    {
        private readonly ApplicationDbContext _db;
        private readonly ApplicationUserManager _manager;

        protected BaseController(ApplicationDbContext db, ApplicationUserManager manager)
        {
            _db = db;
            _manager = manager;
        }

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
                return InternalServerError();

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    foreach (var error in result.Errors)
                        ModelState.AddModelError("", error);

                if (ModelState.IsValid)
                    return BadRequest();

                return BadRequest(ModelState);
            }

            return null;
        }

        protected virtual ApplicationDbContext Db
        {
            get
            {
                return _db;
            }
        }
        protected virtual ApplicationUserManager Manager
        {
            get
            {
                return _manager;
            }
        }
          
    }
}