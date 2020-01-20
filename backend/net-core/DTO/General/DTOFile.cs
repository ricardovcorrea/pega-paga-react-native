using System;

namespace Api.DTO
{
    public class DTOFile
    {
        public string Id { get; set; }
        public string Key { get; set; }
        public string Url { get; set; }
        public Byte[] Bytes { get; set; }
        public string Extension { get; set; }

        public string ThumbnailUrl { get; set; }
        public string MimeType { get; set; }
    }
}
