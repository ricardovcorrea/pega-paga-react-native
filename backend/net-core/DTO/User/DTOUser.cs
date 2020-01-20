using System.Collections.Generic;
using Api.enumerators;

namespace Api.DTO
{
    public class DTOUser
    {
        public string Id { get; set; }
        
        public string Email { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }
        
        public UserType Type { get; set; }

        public string Document { get; set; }

        public DTOFile Portrait { get; set; }

        public string VerificationCode { get; set; }

        public bool HasAcceptedEmailMarketing { get; set; }
        public bool IsActive { get; set; }

        public UserAccessLevel AccessLevel { get; set; }

        public string Token { get; set; }

        public string Tel { get; set; }
        public string Cel { get; set; }

    }
}
