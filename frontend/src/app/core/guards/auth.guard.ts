import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Userservices } from '../services/userservices';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userSrv = inject(Userservices);

  if (userSrv.isLoggedIn()) {
    return true;
  }

  return router.parseUrl('/login');
};