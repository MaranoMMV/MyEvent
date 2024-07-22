import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpInterceptorFn, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';
import { CustomInterceptor } from './custom.interceptor';
// import { customInterceptor } from './custom.interceptor';




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
    provideClientHydration(), 
    provideAnimationsAsync(),
    provideAnimations(), 
    provideToastr(),
  ]
  };
