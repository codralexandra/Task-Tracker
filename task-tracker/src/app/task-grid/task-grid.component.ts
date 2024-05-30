import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../services/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-grid',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatDividerModule,
    MatCardModule,
    CommonModule,
    TaskCardComponent,
    EditTaskComponent,
  ],
  providers: [TaskService],
  templateUrl: './task-grid.component.html',
  styleUrl: './task-grid.component.scss'
})
export class TaskGridComponent {
  //@Input() tasks: Task[] = [];
  tasks: Task[];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    ) {}

  ngOnInit()
  {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
}
