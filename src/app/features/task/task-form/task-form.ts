import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AuthService} from '../../../core/auth/services/auth-service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Tasks} from '../interfaces/tasks';
import {TaskService} from '../services/taskService';
import {Router} from '@angular/router';
import {UsersService} from '../../users/users-service';
import {User} from '../../../core/auth/interfaces/user';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule
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

  ngOnInit() {
    if (this.authService.currentUser()?.role === 'ADMIN') {
      this.usersService.getAllUsers().subscribe({
        next: (users: User[]) => this.users.set(users),
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
    this.taskService.createTask(task).subscribe({
      next: () => {
        this.router.navigate(['/tasks'])
      }
    })

  }

}
