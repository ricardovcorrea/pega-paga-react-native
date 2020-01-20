using System.Net;
using System.Net.Mail;
using Api.Configurations;

namespace Api.Infrastructure
{
    public interface IEmailSender
    {
        bool Send(string to, string subject, string body);
    }

    public class EmailSender : IEmailSender
    {
        private readonly IEmailSettings _emailSettings;

        public EmailSender(IEmailSettings emailSettings)
        {
            _emailSettings = emailSettings;
        }

        public bool Send(string to, string subject, string body)
        {
            var newEmail = new MailMessage()
            {
                From = new MailAddress(_emailSettings.FromEmail, "Helpet Group"),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            newEmail.To.Add(new MailAddress(to));
            
            this.sendEmail(newEmail);

            return true;
            
        }

        private void sendEmail(MailMessage email)
        {
            using (SmtpClient smtp = new SmtpClient(_emailSettings.PrimaryDomain, _emailSettings.PrimaryPort))
            {
                smtp.Credentials = new NetworkCredential(_emailSettings.UsernameEmail, _emailSettings.UsernamePassword);
                smtp.EnableSsl = true;
                smtp.Send(email);
            }
        }
    }
}
