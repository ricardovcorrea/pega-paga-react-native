using System.Collections.Generic;
using Api.enumerators;

namespace Api.DTO
{
    public class DTOTransaction
    {
        public string Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int Amount { get; set; }
    }
}
