using System;
namespace Api.DTO
{
    public class DTOAddress
    {
        public string Street { get; set; }
        public string Number { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string State { get; set; }

        public string Latitude { get; set; }
        public string Longitude { get; set; }
    }
}
