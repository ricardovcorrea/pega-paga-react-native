using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Models
{
    public class UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }
        public string VerificationCode { get; set; }
        public bool IsActive { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }
        public int Type { get; set; }
        public string Document { get; set; }
        public bool HasAcceptedEmailMarketing { get; set; }

        public string ImageId { get; set; }

        public int AccessLevel { get; set; }
    }
}
