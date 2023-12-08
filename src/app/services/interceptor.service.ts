import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    const headers: HttpHeaders = req.headers;
    headers.append('Access-Control-Allow-Origin', '*');

    // ! TODO : check token
    /*
    const account = this.accountService.accountValue;
    const isLoggedIn = account?.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      headers.append(`Authorization`, `Bearer ${account.token}`);
    }

     return next.handle(request);

    */
    request = req.clone({ headers: headers });
    return next.handle(request);
  }
}
