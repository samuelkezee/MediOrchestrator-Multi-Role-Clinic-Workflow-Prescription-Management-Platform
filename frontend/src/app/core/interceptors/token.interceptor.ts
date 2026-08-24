import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Retrieve token from sessionStorage / localStorage
  let token = sessionStorage.getItem('token') || localStorage.getItem('token');

  // If token is stored inside the serialized user object
  if (!token) {
    const userData = sessionStorage.getItem('hospitalUser') || localStorage.getItem('hospitalUser');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        token = parsed.token || parsed.data?.token || parsed.jwtToken || parsed.accessToken || '';
      } catch (e) {
        console.error('Error parsing stored user data for token:', e);
      }
    }
  }

  console.log(`[Interceptor] Request: ${req.method} ${req.url} | Token:`, token ? `${token.substring(0, 15)}...` : 'NONE');

  // Clone request with Authorization header if token exists
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(`[Interceptor] Error ${error.status} for ${req.url}:`, error);
      // If unauthorized, clear storage and redirect to login
      if (error.status === 401) {
        sessionStorage.removeItem('hospitalUser');
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

