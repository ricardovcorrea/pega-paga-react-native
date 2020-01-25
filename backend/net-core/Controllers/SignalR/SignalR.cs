using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Api.Controllers
{
    public class SignalR : Hub
    {
        public async Task sendMessage(string message)
        {
            await Clients.All.SendAsync("receiveMessage", message);
        }
    }
}