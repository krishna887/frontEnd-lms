import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { customInterceptor } from './core/interceptor/custom.interceptor';
import { provideToastr } from 'ngx-toastr';
import { loaderInterceptor } from './core/interceptor/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([customInterceptor,loaderInterceptor])),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideToastr()]
};
