import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // Si l'utilisateur est déjà connecté, rediriger vers /tasks
  if (authService.currentUser()) {
    router.navigate(['/tasks']);
    return false;
  }

  // Sinon, autoriser l'accès à la page d'auth
  return true;
};
