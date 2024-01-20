import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/constants/endpoints.constant';
import { IApplication } from 'app/modules/sections/management/interfaces/applications.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private _api = `${environment.api}/${ENDPOINTS.APPLICATIONS}`;

  constructor(private readonly _http: HttpClient) {}

  getList(): Observable<IApplication[]> {
    return this._http.get<IApplication[]>(this._api);
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
