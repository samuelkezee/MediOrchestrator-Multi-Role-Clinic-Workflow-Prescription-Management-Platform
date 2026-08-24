import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const loggedUser = sessionStorage.getItem('hospitalUser') || localStorage.getItem('hospitalUser');
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  if (loggedUser || token) {
    return true;
  }

  // Not logged in -> redirect to login page
  router.navigate(['/login']);
  return false;
};
