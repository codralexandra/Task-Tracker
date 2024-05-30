import { Component,EventEmitter,Input, Output } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../task';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TaskService } from '../services/task.service';
import { Status } from '../status';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    CommonModule
  ],
  providers: [TaskService],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task : Task;
  @Output() deleteTaskEvent = new EventEmitter<Task>();

  constructor(
    private dialog : MatDialog,
    private taskService: TaskService,
  ) {}

  deleteTask(task)
  {
    this.taskService.deleteTask(task)
      .subscribe(task => {
        console.log('Task deleted successfully:', task);
        this.taskService.getTasks();
      });

  }

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

  editTask(task: Task) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.taskService.editTask(task).subscribe((task) => {
        console.log('Task edited successfully', task);
      });
    });
  }
  
}