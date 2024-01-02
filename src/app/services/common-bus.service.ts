import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'app/constants/storage-keys.constants';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonBusService {
  private _currentUser?: IUser;
  private _accessToken?: string;

  private _accessTokenSubject: Subject<string> = new Subject<string>();
  private _currentUserSubject: Subject<IUser> = new Subject<IUser>();

  constructor(private readonly _session: SessionStorageService) {
    this._getStoragedInformation();
  }

  private _getStoragedInformation() {
    //* TOKEN
    const token = this._session.retrieve(STORAGE_KEYS.TOKEN);
    if (token !== '') {
      this.setAccessToken(token);
    }

    //* CURRENT USER
    const user: IUser = this._session.retrieve(STORAGE_KEYS.CURRENT_USER);
    if (user) {
      this.setCurrentUser(user);
    }
  }

  public getAccessToken(): Observable<string> {
    return this._accessTokenSubject.asObservable();
  }

  public setAccessToken(token: string | undefined) {
    this._accessToken = token;
    this._session.store(STORAGE_KEYS.TOKEN, token || '');
    if (token) {
      this._accessTokenSubject.next(token);
    }
  }

  public getCurrentUser(): Observable<IUser> {
    console.log('COMMON BUS GET', this._currentUser);
    return this._currentUserSubject.asObservable();
  }

  public setCurrentUser(user: IUser) {
    console.log('COMMON BUS SET', this._currentUser);
    this._currentUser = user;
    this._session.store(STORAGE_KEYS.CURRENT_USER, user);
    if (user) {
      this._currentUserSubject.next(user);
    }
  }
}
