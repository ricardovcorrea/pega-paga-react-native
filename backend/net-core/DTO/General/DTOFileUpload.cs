using System;
using Microsoft.AspNetCore.Http;

namespace Api.DTO
{
    public class DTOFileUpload
    {
        public IFormFile Files { get; set; }
        public string Key { get; set; }
        public string Folder { get; set; }
    }
}
