import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'app/constants/storage-keys.constants';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private readonly _session: SessionStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._session.retrieve(STORAGE_KEYS.TOKEN);
    const request = req.clone({
      headers: req.headers
        .set(`Access-Control-Allow-Origin`, `*`)
        .set(`Authorization`, `Bearer ${token || ''}`)
    });

    return next.handle(request);
  }
}
