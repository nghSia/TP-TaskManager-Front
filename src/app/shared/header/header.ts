import {Component, inject} from '@angular/core';
import {AuthService} from '../../core/auth/services/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected authService:AuthService = inject(AuthService)
  private router = inject(Router)

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
