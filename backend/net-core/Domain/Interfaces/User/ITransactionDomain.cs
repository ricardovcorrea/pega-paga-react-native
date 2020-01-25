using System;
using System.Collections.Generic;
using Api.DTO;

namespace Api.Domain.Interfaces
{
    public interface ITransactionDomain
    {
        DTOResponse<int> GetUserBalance(string userId);
        DTOResponse<bool> Pay(string to, int amount);
    }
}
