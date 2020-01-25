using System;
using Api.DTO;
using Api.enumerators;
using Api.Models;

namespace Api.Extensions
{
    public static class TransactionExtension
    {
        public static DTOTransaction ToDTO(this TransactionModel transactionModal)
        {
            return new DTOTransaction()
            {
                Id = transactionModal.Id,
                From = transactionModal.From,
                To = transactionModal.To,
                Amount = transactionModal.Amount
            };
        }

        public static TransactionModel ToModel(this DTOTransaction dtoTransaction)
        {
            return new TransactionModel()
            {
                Id = dtoTransaction.Id,
                From = dtoTransaction.From,
                To = dtoTransaction.To,
                Amount = dtoTransaction.Amount
            };
        }
    }
}
