import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AppInjector } from 'app/app.module';
import { STORAGE_KEYS } from 'app/constants/storage-keys.constants';
import { LoginService } from 'app/modules/layout/navbar/services/login.service';
import { CommonBusService } from 'app/services/common-bus.service';
import { SessionStorageService } from 'ngx-webstorage';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const _session = AppInjector.get(SessionStorageService);
  const _loginService = AppInjector.get(LoginService);
  const _router = AppInjector.get(Router);
  const token = _session.retrieve(STORAGE_KEYS.TOKEN);
  console.log('TOKEN', token);

  const request = req.clone({
    headers: req.headers
      .set('Content-Type', 'application/json')
      .set(`Access-Control-Allow-Origin`, `*`)
      .set(`Authorization`, `Bearer ${token ?? ''}`)
  });

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error?.statusCode === 401) {
        _loginService.logout();
        _router.navigate([`/`]);
      }
      return throwError(() => error);
    })
  );
};
