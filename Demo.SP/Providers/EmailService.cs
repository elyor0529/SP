using System.Net.Mail;
using System.Threading.Tasks;
using Demo.SP.Helpers;
using Microsoft.AspNet.Identity;

namespace Demo.SP.Providers
{

    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await SendGridHelper.SendAsync(message, new MailAddress("levdeo@hotmail.com"));
        }
    }
}