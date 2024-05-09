import { Routes } from '@angular/router';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { AddTaskComponent } from './add-task/add-task.component';

export const routes: Routes = [ 
    { path: '', component: TasksViewComponent}, 
    { path: 'add',component: AddTaskComponent}  
];

