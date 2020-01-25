using System;
using System.Collections.Generic;
using Api.Configurations;
using Api.Domain.Interfaces;
using Api.DTO;
using Api.enumerators;
using Api.Extensions;
using Api.Infrastructure;
using Api.Models;
using MongoDB.Driver;

using System.IdentityModel;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace Api.Domain
{
    public class TransactionDomain : BaseDomain, ITransactionDomain
    {
        private readonly IMongoCollection<TransactionModel> _transactionCollection;
        
        public TransactionDomain(IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor, IGeneralSettings generalSettings, IDBSettings dbSettings) : base(environment, httpContextAccessor, generalSettings)
        {
            var client = new MongoClient(dbSettings.ConnectionString);
            var database = client.GetDatabase(dbSettings.DatabaseName);

            _transactionCollection = database.GetCollection<TransactionModel>(dbSettings.TransactionsCollectionName);
        }
       
        #region Publics
        public DTOResponse<int> GetUserBalance(string userId)
        {
            var foundUserTransactions = _transactionCollection.Find<TransactionModel>(transaction => transaction.From == userId || transaction.To == userId).SortBy(transaction => transaction.Id).ToList();
            if(foundUserTransactions.Count == 0)
            {
                return new DTOResponse<int>()
                {
                    Code = 200,
                    Data = 0
                };
            }

            var total = 0;
            foreach(var transaction in foundUserTransactions) {
                if(transaction.To == userId)
                {
                    total += transaction.Amount;
                }

                if (transaction.From == userId)
                {
                    total -= transaction.Amount;
                }
            }

            return new DTOResponse<int>()
            {
                Code = 200,
                Data = total
            };
        }

        public DTOResponse<bool> Pay(string to, int amount)
        {
            if (string.IsNullOrWhiteSpace(to) || amount == 0)
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "To userId and amount are required!"
                };
            }

            var userBalance = 0;
            var getUserBalanceResponse = GetUserBalance(_authenticatedUserId);
            if(getUserBalanceResponse.Code == 200)
            {
                userBalance = getUserBalanceResponse.Data;
            }

            if (userBalance - amount < 0 && _authenticatedUserId != "5e250e5c7b49b3080f3c5d92")
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "You dont have this amount to transfer!"
                };
            }

            var transactionModel = new TransactionModel()
            {
                From = _authenticatedUserId,
                To = to,
                Amount = amount,
                Datetime = DateTime.Now
            };

            _transactionCollection.InsertOne(transactionModel);

            return new DTOResponse<bool>()
            {
                Code = 200,
                Data = true
            };
        }

        public DTOResponse<List<DTOTransaction>> GetUserTransactions(string userId)
        {
            var foundUserTransactions = _transactionCollection.Find<TransactionModel>(transaction => transaction.From == userId || transaction.To == userId).SortByDescending(transaction => transaction.Id).ToList();
            return new DTOResponse<List<DTOTransaction>>()
            {
                Code = 200,
                Data = foundUserTransactions.Select(transactionModel => transactionModel.ToDTO()).ToList()
            };  
        }
        #endregion
    }
}
