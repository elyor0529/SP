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
    public abstract class BaseController : ApiController
    {
        private readonly ApplicationDbContext _db;

        protected BaseController(ApplicationDbContext db)
        {
            _db = db; 
        }
         
        protected virtual ApplicationDbContext Db
        {
            get
            {
                return _db;
            }
        } 
    }
}