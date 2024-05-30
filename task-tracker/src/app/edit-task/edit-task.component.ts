import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose,
  MatDialogContent,  MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { Task } from '../task';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Status } from '../status';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    MatOptionModule,
    CommonModule
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  statuses : Status[] = []

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  ngOnInit(){
    this.statuses = Object.values(Status);
  }

  save(): void{
    this.dialogRef.close(this.data);
  }

  cancel(): void{
    this.dialogRef.close();
  }
}
