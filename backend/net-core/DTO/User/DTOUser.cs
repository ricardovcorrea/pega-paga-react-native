using System.Collections.Generic;
using Api.enumerators;

namespace Api.DTO
{
    public class DTOUser
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public string Token { get; set; }

        public int Balance { get; set; }

        public string VerificationCode { get; set; }

        public List<DTOTransaction> Transactions { get; set; }

    }
}
