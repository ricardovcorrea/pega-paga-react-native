using System.Collections.Generic;
using Api.enumerators;

namespace Api.DTO
{
    public class DTOTransaction
    {
        public string Id { get; set; }
        public DTOUser From { get; set; }
        public DTOUser To { get; set; }
        public int Amount { get; set; }
    }
}
