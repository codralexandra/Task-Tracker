import { Component, ViewChild,NgZone } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { Task } from '../task';
import { Status } from '../status';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule,
    EditTaskComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [TaskService],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  title : String;
  description : String;
  assignedTo : String;


  constructor(
    private taskService: TaskService,
    private router: Router,
    private _ngZone: NgZone
    ) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit() {
    const newTask = <Task>{
      name: this.title,
      description: this.description,
      assignedTo: this.assignedTo,
      status: Status.ToDo
    }
  
    this.taskService.addTask(newTask)
      .subscribe(task => {
        console.log('Task added successfully:', task);
        this.router.navigate(['/']);
      });
  }

  onClick()
  {
    this.router.navigate(['/']);
  }
}
