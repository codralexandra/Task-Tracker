using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TasksAPI.Models;

namespace TasksAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        static List<TaskModel> _tasks = new List<TaskModel> { new TaskModel { Id = Guid.NewGuid(), Title = "First Task", Description = "First Task Description" , AssignedTo = "Author_1", Status = "To do"},
        new TaskModel { Id = Guid.NewGuid(), Title = "Second Task", Description = "Second Task Description", AssignedTo = "Author_1", Status = "To do" },
        new TaskModel { Id = Guid.NewGuid(), Title = "Third Task", Description = "Third Task Description", AssignedTo = "Author_2", Status = "To do"  },
        new TaskModel { Id = Guid.NewGuid(), Title = "Fourth Task", Description = "Fourth Task Description", AssignedTo = "Author_3", Status = "To do"  },
        new TaskModel { Id = Guid.NewGuid(), Title = "Fifth Task", Description = "Fifth Task Description", AssignedTo = "Author_4", Status = "To do"  }
        };

        [HttpGet]
        public IActionResult GetTasks()
        {
            return Ok(_tasks);
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null");
                //return StatusCode(StatusCodes.Status500InternalServerError, "Error in processing the Task");
            }
            else return Ok(task);
        }

        [HttpPut]
        public IActionResult UpdateTask([FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null");
                //return StatusCode(StatusCodes.Status500InternalServerError, "Error in processing the Task");
            }
            else
            {
                TaskModel foundTask = _tasks.Find(t => t.Id == task.Id);
                if (foundTask == null)
                {
                    return NotFound("Task wasn't found.");
                }

                foundTask.Title = task.Title ?? foundTask.Title;
                foundTask.Description = task.Description ?? foundTask.Description;
                foundTask.AssignedTo = task.AssignedTo ?? foundTask.AssignedTo;
                foundTask.Status = task.Status ?? foundTask.Status;

                return Ok(foundTask);
            }
        }

        [HttpDelete]
        public IActionResult Delete(Guid Id)
        {
            if (Id == Guid.Empty)
            {
                return BadRequest("Task cannot be null");
                //return StatusCode(StatusCodes.Status500InternalServerError, "Error in processing the Task");
            }
            else
            {
                TaskModel foundTask = _tasks.Find(t => t.Id == Id);
                if (foundTask == null)
                {
                    return NotFound("Task wasn't found.");
                }

                _tasks.Remove(foundTask);

                return Ok("Succesfully deleted the task.");
            }
        }
    }
}
