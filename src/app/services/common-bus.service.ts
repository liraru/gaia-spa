import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'app/constants/storage-keys.constants';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonBusService {
  private _accessTokenSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(this._session.retrieve(STORAGE_KEYS.TOKEN));
  private _currentUserSubject: BehaviorSubject<IUser> =
    new BehaviorSubject<IUser>(
      this._session.retrieve(STORAGE_KEYS.CURRENT_USER)
    );

  constructor(private readonly _session: SessionStorageService) {}

  public getAccessToken(): Observable<string> {
    return this._accessTokenSubject.asObservable();
  }

  public setAccessToken(token: string) {
    this._session.store(STORAGE_KEYS.TOKEN, token || '');
    this._accessTokenSubject.next(token);
  }

  public getCurrentUser(): Observable<IUser> {
    return this._currentUserSubject.asObservable();
  }

  public setCurrentUser(user: IUser) {
    this._session.store(STORAGE_KEYS.CURRENT_USER, user);
    this._currentUserSubject.next(user);
  }
}
