import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/auth/services/auth-service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService:AuthService = inject(AuthService)
  private fb = inject(FormBuilder)
  private router = inject(Router)

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)] ]
  })

  onSubmit() {
    const credentials = this.loginForm.getRawValue()
    this.authService.login(credentials)
      .subscribe(
        (next) => {
          this.router.navigate(['/tasks'])
        },
      )
  }


}
