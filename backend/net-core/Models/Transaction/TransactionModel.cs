using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Models
{
    public class TransactionModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int Amount{ get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime Datetime { get; set; }
    }
}
