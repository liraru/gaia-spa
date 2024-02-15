import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/constants/endpoints.constant';
import { IApplication } from 'app/modules/sections/management/interfaces/applications.interface';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { environment } from 'environments/environment';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _api = `${environment.api}/${ENDPOINTS.USERS}`;

  constructor(private readonly _http: HttpClient) {}

  private _parseDBUser(user: any): IUser {
    const parsed: IUser = {
      uuid: user.uuid,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      fullname: `${user.name} ${user.lastname}`,
      birthdate: user.birthdate,
      genre: user.genre,
      height: user.height,
      applications: [],
    };

    const app: string[] = [];
    user.applications?.forEach((el: IApplication) => app.push(el.uuid));
    parsed.applications = app;
    return parsed;
  }

  public getUsersList() {
    return this._http.get(`${this._api}`);
  }

  public addUser(user: IUser) {
    return this._http.post(`${this._api}`, user).pipe(switchMap(() => this.getUsersList()));
  }

  public editUser(user: IUser, uuid: string) {
    return this._http.put(`${this._api}/${uuid}`, user).pipe(switchMap(() => this.getUsersList()));
  }

  public pwdUpdate(uuid: string, pwd: string) {
    return this._http.put(`${this._api}`, {
      uuid: uuid,
      pwd: pwd,
    });
  }

  public deleteUser(uuid: string) {
    return this._http.delete(`${this._api}/${uuid}`);
  }

  public updateLinkedApplication(user: string, app: string, status: boolean): Observable<IUser> {
    if (status) {
      return this._http
        .post<IUser>(`${this._api}/${user}/${ENDPOINTS.LINK_APPLICATION}/${app}`, {})
        .pipe(map((user: IUser) => this._parseDBUser(user)));
    } else {
      return this._http
        .delete<IUser>(`${this._api}/${user}/${ENDPOINTS.UNLINK_APPLICATION}/${app}`, {})
        .pipe(map((user: IUser) => this._parseDBUser(user)));
    }
  }
}
