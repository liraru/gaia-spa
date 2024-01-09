import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENDPOINTS } from 'app/constants/endpoints.constant';
import { CommonBusService } from 'app/services/common-bus.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'environments/environment.dev';
import { SECRETS } from 'private/secrets.constant';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _commonBus: CommonBusService,
    private readonly _router: Router
  ) {}
  private readonly _api = environment.api;

  private _encrypt(password: string): string {
    return CryptoJS.AES.encrypt(
      password.trim(),
      SECRETS.ENCRYPT_KEY
    ).toString();
  }

  login(user: string, password: string): Observable<any> {
    return this._http
      .post(`${this._api}/${ENDPOINTS.LOGIN}`, {
        username: user,
        password: this._encrypt(password)
      })
      .pipe(
        tap((response: any) => {
          this._commonBus.setAccessToken(response.accessToken);
          this._commonBus.setCurrentUser(response.user);
        })
      );
  }

  logout() {
    this._commonBus.setAccessToken(undefined);
    this._commonBus.setCurrentUser(undefined);
    this._router.navigate([`/`]);
  }
}
