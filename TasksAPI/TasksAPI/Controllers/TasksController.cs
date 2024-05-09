using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TasksAPI.Models;
using TasksAPI.Services;

namespace TasksAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        
        ITaskCollectionService _taskCollectionService;

        public TasksController(ITaskCollectionService taskCollectionService)
        {
            _taskCollectionService = taskCollectionService ?? throw new ArgumentNullException(nameof(TaskCollectionService));
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            List<TaskModel> tasks = _taskCollectionService.GetAll();
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null");
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
                List<TaskModel> tasks = _taskCollectionService.GetAll();
                TaskModel foundTask = tasks.Find(t => t.Id == task.Id);
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
                List<TaskModel> tasks = _taskCollectionService.GetAll();
                TaskModel foundTask = tasks.Find(t => t.Id == Id);
                if (foundTask == null)
                {
                    return NotFound("Task wasn't found.");
                }

                tasks.Remove(foundTask);

                return Ok("Succesfully deleted the task.");
            }
        }
    }
}
