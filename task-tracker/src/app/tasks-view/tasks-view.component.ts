import { Component, Input } from '@angular/core';
import { TaskGridComponent } from '../task-grid/task-grid.component';
import { Task } from '../task';
import { Status } from '../status';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-tasks-view',
  standalone: true,
  imports: [
    TaskGridComponent,
    TaskListComponent,
    MatIconModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.scss'
})
export class TasksViewComponent {
  taskList : Task[];

  isList: boolean = true;
  notificationMessage: string;

  constructor(private notificationService: NotificationService)
  {
    //...
  }

  switchToListView() {
    this.isList = true;
  }

  switchToGridView() {
    this.isList = false;
  }

  ngOnInit()
  {
    this.notificationService.notificationSubject.subscribe(
        hasNotifications => this.notificationMessage =
        hasNotifications ? "New notifications, pleease refresh the page" : ""
    );
  }
  
}
