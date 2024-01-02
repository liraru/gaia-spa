import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'app/constants/storage-keys.constants';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonBusService {
  constructor(private readonly _session: SessionStorageService) {
    this._getStoragedInformation();
  }

  private _accessToken: Subject<string> = new Subject<string>();
  private _currentUser: Subject<IUser> = new Subject<IUser>();

  private _getStoragedInformation() {
    const token = this._session.retrieve(STORAGE_KEYS.TOKEN);
    if (token !== '') {
      this.setAccessToken(token);
    }

    const user: IUser = this._session.retrieve(STORAGE_KEYS.CURRENT_USER);
    if (user) {
      this.setCurrentUser(user);
    }
  }

  public getAccessToken(): Observable<string> {
    return this._accessToken;
  }

  public setAccessToken(token: string | undefined) {
    this._session.store(STORAGE_KEYS.TOKEN, token || '');
    if (token) {
      this._accessToken.next(token);
    }
  }

  public getCurrentUser(): Observable<IUser> {
    return this._currentUser;
  }

  public setCurrentUser(user: IUser) {
    this._session.store(STORAGE_KEYS.CURRENT_USER, user);
    if (user) {
      this._currentUser.next(user);
    }
  }
}
