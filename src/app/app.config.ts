import {
  ApplicationConfig,
  inject,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpParams,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

import { routes } from './app.routes';
import { AuthService } from './services/auth.service';

const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const userSubject = inject(AuthService).user;

  return userSubject.pipe(
    take(1),
    exhaustMap(user => {
      if (!user) {
        return next(req);
      }

      const clonedReq = req.clone({ params: new HttpParams().set('auth', user.token) });

      return next(clonedReq);
    }),
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideExperimentalZonelessChangeDetection(),
  ],
};
