import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { AppInjector } from 'app/app.module';
import { STORAGE_KEYS } from 'app/constants/storage-keys.constants';
import { SessionStorageService } from 'ngx-webstorage';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const _session = AppInjector.get(SessionStorageService);
  const token = _session.retrieve(STORAGE_KEYS.TOKEN);
  console.log('TOKEN', token);

  const request = req.clone({
    // withCredentials: true,
    headers: req.headers
      .set('Content-Type', 'application/json')
      .set(`Access-Control-Allow-Origin`, `*`)
      .set(`Authorization`, `Bearer ${token ?? ''}`)
  });

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => throwError(() => error))
  );
};
