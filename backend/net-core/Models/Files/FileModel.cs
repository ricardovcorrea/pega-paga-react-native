using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Models
{
    public class FileModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Key { get; set; }
        public string Extension { get; set; }
        public string Url { get; set; }
        public string Folder { get; set; }
        public string Path { get; set; }
        public DateTime LastView { get; set; }
    }
}
