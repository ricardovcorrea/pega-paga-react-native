using System;
using Api.DTO;
using Api.enumerators;
using Api.Models;

namespace Api.Extensions
{
    public static class TransactionExtension
    {
        public static DTOTransaction ToDTO(this TransactionModel transactionModel)
        {
            return new DTOTransaction()
            {
                Id = transactionModel.Id,
                From = new DTOUser()
                {
                    Id = transactionModel.From  
                },
                To = new DTOUser()
                {
                    Id = transactionModel.To
                },
                Amount = transactionModel.Amount
            };
        }

        public static TransactionModel ToModel(this DTOTransaction dtoTransaction)
        {
            return new TransactionModel()
            {
                Id = dtoTransaction.Id,
                From = dtoTransaction.From.Id,
                To = dtoTransaction.To.Id,
                Amount = dtoTransaction.Amount
            };
        }
    }
}
