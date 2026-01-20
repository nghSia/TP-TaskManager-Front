import {Component, DestroyRef, inject, signal} from '@angular/core';
import {AuthService} from '../../../core/auth/services/auth-service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Credentials} from '../../../core/auth/interfaces/credentials';
import {Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService:AuthService = inject(AuthService)
  private fb = inject(FormBuilder)
  private router = inject(Router)
  private destroyRef = inject(DestroyRef);

  errorMessage = signal('')

  registerForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {
    const credentials: Credentials = this.registerForm.getRawValue()
    this.authService.register(credentials)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: () => {
        console.log('user created')
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err)
        this.errorMessage.set(err.error.message)
      }
    })
  }

}
