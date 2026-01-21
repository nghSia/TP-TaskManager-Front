import {Component, inject, OnInit, signal} from '@angular/core';
import {TaskService} from '../services/taskService';
import {Tasks} from '../interfaces/tasks';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    DecimalPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private s_taskService = inject(TaskService);
  public tasks = signal<Tasks[]>([]);
  public doneTasks = signal<number>(0);
  public myTasks = signal<number>(0);
  public m_isAdmin : boolean = false;
  ngOnInit() {
    this.m_isAdmin = localStorage.getItem('role') === 'ADMIN';
    this.getTasks();
  }

  getTasks() {
    this.s_taskService.getAllTask()
      .subscribe({
        next: (_tasks: Tasks[]) => {
          this.tasks.set(_tasks);
          this.myTasks.set(this.getPersonalTaskCount(_tasks));
          this.doneTasks.set(_tasks.filter(task => task.status === 'DONE').length);
        },
        error: (err) => console.log(err)
      })
  }

  getPersonalTaskCount(tasks: Tasks[]): number {
    let currentUserId = localStorage.getItem('userId');
    if(currentUserId){
      return tasks.filter(task => task.user?.id === Number(currentUserId)).length;
    }
    return 0;
  }
}
