using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Api.DTO;
using Api.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionDomain _transactionDomain;

        public TransactionController(ITransactionDomain transactionDomain)
        {
            _transactionDomain = transactionDomain;
        }

        [HttpPost]
        [Route("pay")]
        public DTOResponse<bool> Pay(DTOTransaction transactionInfo)
        {
            return _transactionDomain.Pay(transactionInfo.To.Id, transactionInfo.Amount);
        }        
    }
}
