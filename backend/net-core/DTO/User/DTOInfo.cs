namespace Api.DTO
{
    public class DTOInfo
    {
        public string Id { get; set; }

        public string Email { get; set; }
        
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }

        public string GoogleAccountId { get; set; }
        public string FacebookAccountId { get; set; }
    }
}
