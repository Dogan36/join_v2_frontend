import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';  // Stelle sicher, dass AuthService existiert

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticatedUser()) {
    return true;  // Der Benutzer ist angemeldet, Zugriff wird gewährt
  } else {
    router.navigate(['/login']);  // Der Benutzer ist nicht angemeldet, leite zu Login um
    return false;
  }
};