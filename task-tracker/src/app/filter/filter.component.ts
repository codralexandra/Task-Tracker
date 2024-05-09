import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Status } from '../status';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  statuses = Object.values(Status);
  @Output() statusSelected: EventEmitter<Status> = new EventEmitter();	
  
  ngOnInit(): void {
    //...
  }	

  selectStatus(status: Status): void{
    this.statusSelected.emit(status)
  }
}  
