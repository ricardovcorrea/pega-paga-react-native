using System;
namespace Api.Configurations
{
    public class DBSettings : IDBSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string UsersCollectionName { get; set; }
        public string PetsCollectionName { get; set; }
        public string BreadCollectionName { get; set; }
        public string CoatCollectionName { get; set; }
        public string FurColorCollectionName { get; set; }
        public string PartnersCollectionName { get; set; }
        public string PartnersCategoryCollectionName { get; set; }
        public string FilesCollectionName { get; set; }
        public string ImagesCollectionName { get; set; }
        public string TransactionsCollectionName { get; set; }

    }

    public interface IDBSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string UsersCollectionName { get; set; }
        string PetsCollectionName { get; set; }
        string BreadCollectionName { get; set; }
        string CoatCollectionName { get; set; }
        string FurColorCollectionName { get; set; }
        string PartnersCollectionName { get; set; }
        string PartnersCategoryCollectionName { get; set; }
        string FilesCollectionName { get; set; }
        string ImagesCollectionName { get; set; }
        string TransactionsCollectionName { get; set; }
    }
}
