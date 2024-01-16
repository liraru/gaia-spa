import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/constants/endpoints.constant';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { environment } from 'environments/environment';
import { map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _api = environment.api;

  constructor(private readonly _http: HttpClient) {}

  public getUsersList() {
    return this._http.get(`${this._api}/${ENDPOINTS.USERS}`).pipe(
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
    return this._http
      .post(`${this._api}/${ENDPOINTS.USERS}`, user)
      .pipe(switchMap(() => this.getUsersList()));
  }

  public editUser(user: IUser, uuid: string) {
    return this._http
      .put(`${this._api}/${ENDPOINTS.USERS}/${uuid}`, user)
      .pipe(switchMap(() => this.getUsersList()));
  }

  public pwdUpdate(uuid: string, pwd: string) {
    return this._http.put(`${this._api}/${ENDPOINTS.USERS}`, {
      uuid: uuid,
      pwd: pwd,
    });
  }

  public deleteUser(uuid: string) {
    return this._http.delete(`${this._api}/${ENDPOINTS.USERS}/${uuid}`);
  }
}
