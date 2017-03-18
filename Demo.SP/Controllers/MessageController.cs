using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Demo.SP.Models;
using Demo.SP.ViewModels;
using Microsoft.AspNet.Identity;
using PagedList;

namespace Demo.SP.Controllers
{
    public class MessageController : BaseController
    {
        private const int PAGE_SIZE = 20;

        public MessageController(ApplicationDbContext db, ApplicationUserManager manager) : base(db, manager)
        {

        }

        [HttpGet]
        [ActionName("list")]
        public IHttpActionResult GetList(int page = 1, string search = "", string column = MessagePropertyKeys.ID, string sort = SortTypes.ASC)
        {
            var query = Db.Messages.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(w => w.Name.Contains(search) ||
                                         w.Text.Contains(search));

            IPagedList<Message> pager;

            switch (column.ToLowerInvariant())
            {
                default:
                    pager = (sort == SortTypes.DESC) ? query.OrderByDescending(o => o.Id).ToPagedList(page, PAGE_SIZE) : query.OrderBy(o => o.Id).ToPagedList(page, PAGE_SIZE);
                    break;
                case MessagePropertyKeys.NAME:
                    pager = (sort == SortTypes.DESC) ? query.OrderByDescending(o => o.Name).ToPagedList(page, PAGE_SIZE) : query.OrderBy(o => o.Name).ToPagedList(page, PAGE_SIZE);
                    break;
                case MessagePropertyKeys.DATE:
                    pager = (sort == SortTypes.DESC) ? query.OrderByDescending(o => o.Date).ToPagedList(page, PAGE_SIZE) : query.OrderBy(o => o.Date).ToPagedList(page, PAGE_SIZE);
                    break;
            }

            var model = new MessageListViewModel
            {
                Items = pager,
                Pager = pager.GetMetaData(),
                Column = column,
                Sort = sort,
                Search = search
            };

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
             
            model.UserId = User.Identity.GetUserId();
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
            ent.Name = model.Name;
            ent.Date = model.Date;
            ent.UserId = User.Identity.GetUserId();

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