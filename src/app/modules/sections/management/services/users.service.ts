import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/constants/endpoints.constant';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { environment } from 'environments/environment';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _api = `${environment.api}/${ENDPOINTS.USERS}`;

  constructor(private readonly _http: HttpClient) {}

  public getUsersList() {
    return this._http.get(`${this._api}`).pipe(
      map((resp: any) => {
        const parsed: IUser[] = [];
        resp.forEach((user: any) => {
          parsed.push({
            uuid: user.uuid,
            username: user.username,
            name: user.name,
            lastname: user.lastname,
            fullname: `${user.name} ${user.lastname}`,
            birthdate: user.birthdate,
            genre: user.genre,
            height: user.height,
            applications: user.applications,
          });
        });
        return parsed;
      }),
    );
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
    console.log(`updateLinkedApplication - ${user} - ${app} - ${status}`)
    if (status) {
      return this._http.post<IUser>(`${this._api}/users/${user}/${ENDPOINTS.LINK_APPLICATION}/${app}`, {});
    } else {
      return this._http.delete<IUser>(`${this._api}/users/${user}/${ENDPOINTS.UNLINK_APPLICATION}/${app}`, {});
    }
  }
}
