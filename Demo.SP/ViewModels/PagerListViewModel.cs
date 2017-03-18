using System.Collections.Generic;
using PagedList;

namespace Demo.SP.ViewModels
{
    public class PagerListViewModel<T>
    {
        public IEnumerable<T> Items { get; set; }

        public IPagedList Pager { get; set; }
    }
}