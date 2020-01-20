using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Models
{
    public class ImageModel : FileModel
    {
        public string ThumbnailUrl { get; set; }
        public string ThumbnailPath { get; set; }
        public string MimeType { get; set; }
    }
}
