import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  const router:Router = inject(Router);

  if (authService.currentUser()) return true;

  router.navigate(['/login']);
  return false;

};
