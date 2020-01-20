namespace Api.DTO
{
    public class DTOCreateUser : DTOInfo
    {
        public bool HasAcceptedTermsAndPrivacyPolice { get; set; }
        public bool HasAcceptedEmailMarketing { get; set; }

        public DTOUser User { get; set; }
    }
}
