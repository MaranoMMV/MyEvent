import { isPlatformBrowser } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenString = '';

    if (isPlatformBrowser(this.platformId)) {
      tokenString = localStorage.getItem('auth_token') || '';
    }

    if (tokenString) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenString}`
        }
      });
    }
    return next.handle(request);
  }
}


