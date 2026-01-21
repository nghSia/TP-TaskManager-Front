import {Component, inject, OnInit, signal, WritableSignal, Input} from '@angular/core';
import {AuthService} from '../../../core/auth/services/auth-service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Tasks} from '../interfaces/tasks';
import {TaskService} from '../services/taskService';
import {Router, RouterLink} from '@angular/router';
import {UsersService} from '../../users/users-service';
import {User} from '../../../core/auth/interfaces/user';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit{
  protected authService: AuthService = inject(AuthService)
  private fb = inject(FormBuilder)
  private taskService = inject(TaskService)
  private router = inject(Router)
  private usersService = inject(UsersService)


  users: WritableSignal<User[]> = signal<User[]>([])

  @Input() id?:string;


  ngOnInit() {
    if (this.authService.currentUser()?.role === 'ADMIN') {
      this.usersService.getAllUsers().subscribe({
        next: (users: User[]) => this.users.set(users),
        error: () => console.log('error')
      })
    }

    if (this.id) {
      this.taskService.getTaskById(+this.id).subscribe({
        next: (task: Tasks) => {
          const taskData = {...task, targetUserId: task.user?.id ? task.user.id.toString() : null}
          this.tasksForm.patchValue(taskData)
        },
        error: () => console.log('error')
      })
    }
  }

  tasksForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    targetUserId: [null as string | null]
  })


  onSubmit() {
    const task :Tasks = this.tasksForm.getRawValue()
    if (this.id) {
      this.taskService.updateTask(+this.id, task).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: () => console.log('error')
      })
    } else {
      this.taskService.createTask(task).subscribe({
        next: () => {
          this.router.navigate(['/tasks'])
        },
        error: () => console.log('error')
      })
    }

  }

}
