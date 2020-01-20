namespace Api.DTO
{
    public class DTOCompany
    {
        public string BusinessName { get; set; }
        public DTOAddress Address { get; set; }

        public string FantasyName { get; set; }

        public string TaxCode { get; set; }
        public string VatNumber { get; set; }

        public string Tel { get; set; }

        public string Cel1 { get; set; }
        public string Cel2 { get; set; }

        public string Pec { get; set; }

        public string UniqueCode { get; set; }

        public DTOUser Responsible { get; set; }
    }
}
