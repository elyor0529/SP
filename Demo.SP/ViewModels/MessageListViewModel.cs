using Demo.SP.Models;

namespace Demo.SP.ViewModels
{
    public class MessageListViewModel : PagerListViewModel<Message>
    {
        public string Search { get; set; }

        public string Sort { get; set; }

        public string Column { get; set; }

        public MessageListViewModel()
        {
            Column = "id";
            Sort = "asc";
        }
    }
}