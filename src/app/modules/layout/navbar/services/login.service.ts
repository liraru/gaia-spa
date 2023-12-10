import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { SECRETS } from '../../../../../private/secrets.constant';
import { ENDPOINTS } from '../../../../constants/endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private readonly _http: HttpClient) {}
  private readonly _api = environment.api;

  private _encrypt(password: string): string {
    const CryptoJS = require('crypto-js');
    return CryptoJS.AES.encrypt(
      password.trim(),
      SECRETS.ENCRYPT_KEY
    ).toString();
  }

  login(user: string, password: string) {
    return this._http.post(`${this._api}/${ENDPOINTS.LOGIN}`, {
      username: user,
      password: this._encrypt(password)
    });
  }
}
