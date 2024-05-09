import { EventEmitter, Injectable } from '@angular/core';
import { Task } from '../task';
import { Status } from '../status';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskDeleted: EventEmitter<Task> = new EventEmitter<Task>();
  taskAdded: EventEmitter<Task> = new EventEmitter<Task>();

  baseURL="https://tasksapi20240226164535.azurewebsites.net/api/Tasks"

  headers: HttpHeaders | { [header: string]: string | string[]; };

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  
  constructor(
    private httpClient: HttpClient,
  ) {}

  getTasks() {
    return this.httpClient.get<Task[]>(this.baseURL);
  }

  addTask(newTask: Task) {
    return this.httpClient.post<Task>(this.baseURL, newTask, { headers: this.headers, responseType: 'text' as 'json' });
  }

  editTask(task: Task) {
    return this.httpClient.put<Task>(`${this.baseURL}/${task.id}`, task);
      }
    

  deleteTask(task: Task) {
    return this.httpClient.delete<void>(`${this.baseURL}/${task.id}`,{ headers: this.headers, responseType: 'text' as 'json' });
     }
    
}
