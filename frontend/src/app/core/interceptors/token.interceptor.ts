import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Userservices } from '../services/userservices';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const router = inject(Router);
  const userSrv = inject(Userservices);
  const token = userSrv.getToken();


  const isLoginRequest = req.url.endsWith('/Login');

  const authReq = token && !isLoginRequest
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        userSrv.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

