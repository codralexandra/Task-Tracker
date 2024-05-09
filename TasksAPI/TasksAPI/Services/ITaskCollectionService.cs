using TasksAPI.Models;

namespace TasksAPI.Services
{
    public interface ITaskCollectionService: ICollectionService<TaskModel>
    {
        List<TaskModel> GetTasksByStatus(string status);
    }
}
