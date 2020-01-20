using System;

namespace Api.DTO
{
    public class DTOResponse<T>
    {
        public int Code { get; set; }
        public long? Total { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public T Data { get; set; }
        public string NextPageToken { get; set; }
    }
}
