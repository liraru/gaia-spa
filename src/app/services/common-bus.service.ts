import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'app/constants/storage-keys.constants';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonBusService {
  private _accessTokenSubject: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>(
      this._session.retrieve(STORAGE_KEYS.TOKEN)
    );
  private _currentUserSubject: BehaviorSubject<IUser | undefined> =
    new BehaviorSubject<IUser | undefined>(
      this._session.retrieve(STORAGE_KEYS.CURRENT_USER)
    );

  constructor(private readonly _session: SessionStorageService) {}

  public getAccessToken(): Observable<string | undefined> {
    return this._accessTokenSubject.asObservable();
  }

  public setAccessToken(token: string | undefined) {
    this._session.store(STORAGE_KEYS.TOKEN, token);
    this._accessTokenSubject.next(token);
  }

  public getCurrentUser(): Observable<IUser | undefined> {
    return this._currentUserSubject.asObservable();
  }

  public setCurrentUser(user: IUser | undefined) {
    this._session.store(STORAGE_KEYS.CURRENT_USER, user);
    this._currentUserSubject.next(user);
  }
}
