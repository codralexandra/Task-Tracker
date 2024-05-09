namespace TasksAPI.Services
{
    public interface ICollectionService<T>
    {
        List<T> GetAll();
        T Get(Guid id);
        bool Create(T model);
        bool Update(Guid id, T model);
        bool Delete(Guid id);

    }
}
