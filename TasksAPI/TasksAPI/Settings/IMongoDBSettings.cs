public interface IMongoDBSettings
{
    string TasksCollectionName { get; set; }
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
}

