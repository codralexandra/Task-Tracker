using TasksAPI.Models;

namespace TasksAPI.Services
{
    public class TaskCollectionService : ITaskCollectionService
    {
        List<TaskModel> _tasks = new List<TaskModel> { new TaskModel { Id = Guid.NewGuid(), Title = "First Task", Description = "First Task Description" , AssignedTo = "Author_1", Status = "To do"},
        new TaskModel { Id = Guid.NewGuid(), Title = "Second Task", Description = "Second Task Description", AssignedTo = "Author_1", Status = "To do" },
        new TaskModel { Id = Guid.NewGuid(), Title = "Third Task", Description = "Third Task Description", AssignedTo = "Author_2", Status = "To do"  },
        new TaskModel { Id = Guid.NewGuid(), Title = "Fourth Task", Description = "Fourth Task Description", AssignedTo = "Author_3", Status = "To do"  },
        new TaskModel { Id = Guid.NewGuid(), Title = "Fifth Task", Description = "Fifth Task Description", AssignedTo = "Author_4", Status = "To do"  }
        };

        public bool Create(TaskModel model)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public List<TaskModel> GetAll()
        {
            return _tasks;
        }

        public List<TaskModel> GetTasksByStatus(string status)
        {
            throw new NotImplementedException();
        }


        public bool Update(Guid id, TaskModel model)
        {
            throw new NotImplementedException();
        }

        TaskModel ICollectionService<TaskModel>.Get(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
