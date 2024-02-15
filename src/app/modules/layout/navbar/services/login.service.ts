import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENDPOINTS } from 'app/constants/endpoints.constant';
import { StringHelper } from 'app/helpers/string.helper';
import { CommonBusService } from 'app/services/common-bus.service';
import { environment } from 'environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _commonBus: CommonBusService,
    private readonly _router: Router,
  ) {}

  login(user: string, password: string): Observable<any> {
    return this._http
      .post(`${environment.api}/${ENDPOINTS.LOGIN}`, {
        username: user,
        password: StringHelper.Encrypt(password),
      })
      .pipe(
        tap((response: any) => {
          this._commonBus.setAccessToken(response.accessToken);
          this._commonBus.setCurrentUser(response.user);
        }),
      );
  }

  logout() {
    this._commonBus.setAccessToken(undefined);
    this._commonBus.setCurrentUser(undefined);
    this._router.navigate([`/`]);
  }
}
