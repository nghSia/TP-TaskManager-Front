import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/auth/services/auth-service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Tasks} from '../interfaces/tasks';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  protected authService: AuthService = inject(AuthService)
  private fb = inject(FormBuilder)

  tasksForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    targetUserId: [null]
  })

  onSubmit() {
    const task = this.tasksForm.getRawValue()
    this

  }

}
