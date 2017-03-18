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

        [HttpGet]
        [ActionName("details")]
        public async Task<IHttpActionResult> GetDetails(int? id)
        {
            if (id == null)
                return BadRequest();

            var book = await Db.Messages.FindAsync(id);

            if (book == null)
                return NotFound();

            return Ok(book);
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

        [HttpPut]
        [ActionName("edit")]
        public async Task<IHttpActionResult> Put(Message model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var ent = await Db.Messages.FindAsync(model.Id);

            if (ent == null)
                return NotFound();

            ent.Text = model.Text; 
            ent.Date = model.Date;
            ent.User = model.User;

            Db.Messages.Attach(ent);
            Db.Entry(ent).State = EntityState.Modified;

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