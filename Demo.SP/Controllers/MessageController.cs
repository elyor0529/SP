using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Demo.SP.Models;
using Microsoft.AspNet.Identity;
using PagedList;

namespace Demo.SP.Controllers
{
    public class MessageController : BaseController
    {
        private const int PAGE_SIZE = 20;

        public MessageController(ApplicationDbContext db) : base(db)
        {

        }

        [HttpGet]
        [ActionName("list")]
        public async Task<IHttpActionResult> GetList(string user)
        {
            var model =await Db.Messages.Where(w => w.User == user).ToArrayAsync();

            return Ok(model);
        }

        [HttpPost]
        [ActionName("add")]
        public async Task<IHttpActionResult> Post(Message model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Db.Messages.Add(model);
            Db.Entry(model).State = EntityState.Added;

            await Db.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [ActionName("remove")]
        public async Task<IHttpActionResult> Delete(int? id)
        {
            if (id == null)
                return BadRequest();

            var ent = await Db.Messages.FindAsync(id);

            if (ent == null)
                return NotFound();

            ent.IsDeleted = true;
            Db.Entry(ent).State = EntityState.Modified;

            await Db.SaveChangesAsync();

            return Ok();
        }

    }
}