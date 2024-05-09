namespace TasksAPI.Models
{
    public class TaskModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string AssignedTo { get; set; }
        public string Status { get; set; }
    }
}
