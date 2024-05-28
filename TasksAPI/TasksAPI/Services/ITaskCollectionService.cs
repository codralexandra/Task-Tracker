using TasksAPI.Models;

namespace TasksAPI.Services
{
    public interface ITaskCollectionService: ICollectionService<TaskModel>
    {
        Task<bool> Create(TaskModel taskModel);
        Task<bool> Delete(Guid id);
        Task<List<TaskModel>> GetAll();
        Task<List<TaskModel>> GetTasksByStatus(string status);
        Task<bool> Update(Guid id, TaskModel taskModel);
        Task<TaskModel> Get(Guid id);
    }
}
