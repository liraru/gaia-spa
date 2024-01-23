import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/constants/endpoints.constant';
import { STORAGE_KEYS } from 'app/constants/storage-keys.constants';
import { IApplication } from 'app/modules/sections/management/interfaces/applications.interface';
import { environment } from 'environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private _applications: IApplication[] = [];
  private _applicationsSubject: BehaviorSubject<IApplication[]>;
  private _api = `${environment.api}/${ENDPOINTS.APPLICATIONS}`;

  constructor(private readonly _http: HttpClient, private readonly _session: SessionStorageService) {
    this._applicationsSubject = new BehaviorSubject<IApplication[]>(
      this._session.retrieve(STORAGE_KEYS.APPLICATIONS_LIST),
    );
  }

  getList(): Observable<IApplication[]> {
    return this._http.get<IApplication[]>(this._api).pipe(
      tap((res: IApplication[]) => {
        this._applications = res;
        this.setStoragedList(res);
      }),
    );
  }

  public getStoragedList(): Observable<IApplication[]> {
    if (this._applications.length === 0) {
      return this.getList();
    }
    return this._applicationsSubject.asObservable();
  }

  public setStoragedList(apps: IApplication[]) {
    this._session.store(STORAGE_KEYS.APPLICATIONS_LIST, apps);
    this._applicationsSubject.next(apps);
  }

  getListByUser(user_uuid: string): Observable<IApplication[]> {
    return this._http.get<IApplication[]>(`${this._api}/by-user/${user_uuid}`);
  }

  getById(uuid: string): Observable<IApplication[]> {
    return this._http.get<IApplication[]>(`${this._api}/${uuid}`);
  }

  add(application: IApplication) {
    return this._http.post(this._api, application);
  }

  edit(application: IApplication) {
    return this._http.put(`${this._api}/${application.uuid}`, application);
  }

  delete(uuid: string) {
    return this._http.delete(`${this._api}/${uuid}`);
  }
}
