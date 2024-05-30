using Microsoft.AspNetCore.Mvc;
using TasksAPI.Models;
using TasksAPI.Services;

namespace TasksAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private ITaskCollectionService _tasksCollectionService;

        public TasksController(ITaskCollectionService taskCollectionService)
        {
            _tasksCollectionService = taskCollectionService ?? 
                throw new ArgumentNullException(nameof(TaskCollectionService));
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            List<TaskModel> tasks = await _tasksCollectionService.GetAll();
            return Ok(tasks);
        }


        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null");
            }
            bool result = await _tasksCollectionService.Create(task);
            if(result)
            {
                return Ok(task);
            }
            return BadRequest("There was a problem while handling your request.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, [FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null");
                //return StatusCode(StatusCodes.Status500InternalServerError, "Error in processing the Task");
            }
            bool updateResult = await _tasksCollectionService.Update(id, task);
            if (updateResult)
            {
                return Ok("Task updated succesfully!");
            }
            return BadRequest("Task update failed.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid Id)
        {
            if (Id == Guid.Empty)
            {
                return BadRequest("Task cannot be null");
                //return StatusCode(StatusCodes.Status500InternalServerError, "Error in processing the Task");
            }
            bool deleteResult = await _tasksCollectionService.Delete(Id);
            if(deleteResult)
            {
                return Ok("Task deleted succesfully!");
            }
            return NotFound("Task delete failed.");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(Guid id)
        {
            if(id== Guid.Empty)
            {
                return BadRequest("ID cannot be null.");
            }
            TaskModel task = await _tasksCollectionService.Get(id);
            if (task != null)
            {
                return Ok(task);
            }
            return NotFound("Task not found.");
        }

    }
}
