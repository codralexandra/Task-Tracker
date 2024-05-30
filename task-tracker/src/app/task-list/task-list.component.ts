import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';
import { ChildrenOutletContexts } from '@angular/router';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { Status } from '../status';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent,
    MatButtonModule,
    MatIconModule,
    EditTaskComponent,
  ],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnChanges {
  //@Input() tasks: Task[];
  tasks : Task[];
  @Output() deleteEventEmitter =  new EventEmitter<Task>();
  filteredTasks : Task[];
  
  constructor(
    private taskService: TaskService,
    private dialog : MatDialog,
    ) { this.filteredTasks=this.tasks; }

    getStatusColor(status: Status) {
      switch(status) {
        case Status.Done:
            return 'done-status';
        case Status.ToDo:
          return 'todo-status';
        case Status.InProgress:
          return 'inprogress-status';
        default:
          return '';
      }
    }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredTasks = this.tasks;
  }

  ngOnInit(): void{
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = [...this.tasks];
    } );
    this.taskService.taskDeleted.subscribe(deletedTask => {
     this.tasks = this.tasks.filter(task => task.id !== deletedTask.id);
     this.filteredTasks = [...this.tasks];
    });
    this.taskService.taskAdded.subscribe((newTask: Task) => {
     this.tasks.push(newTask);
    });
  }

  handleStatusSelected(status)
  {
    this.filteredTasks = this.tasks.filter((task)=>task.status==status);
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
       data: task,
     });
 
     dialogRef.afterClosed().subscribe((result) => {
       console.log('The dialog was closed');
       this.taskService.editTask(task).subscribe((task)=> {
        console.log('Task edited succesfully', task);
       });
     });
   }

  deleteTask(taskToDelete: Task): void {
    this.taskService.deleteTask(taskToDelete).subscribe((task) => {
      console.log('Task deleted successfully', task);
      this.taskService
        .getTasks()
        .subscribe((tasks) => (this.filteredTasks = tasks));
    });
  }
}
