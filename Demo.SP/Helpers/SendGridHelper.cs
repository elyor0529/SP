using System.Configuration;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using SendGrid;

namespace Demo.SP.Helpers
{
    public static class SendGridHelper
    {
        public static async Task SendAsync(IdentityMessage message, MailAddress from)
        {
            var myMessage = new SendGridMessage();

            myMessage.AddTo(message.Destination);
            myMessage.From = from;
            myMessage.Subject = message.Subject;
            myMessage.Text = message.Body;
            myMessage.Html = message.Body;

            myMessage.DisableClickTracking();

            // Create a Web transport for sending email. 
            var transportWeb = new Web(ConfigurationManager.AppSettings["SendGridKey"]);

            // Send the email.
            await transportWeb.DeliverAsync(myMessage);
        }
    }
}