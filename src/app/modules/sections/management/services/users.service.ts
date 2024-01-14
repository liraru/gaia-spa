import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/constants/endpoints.constant';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

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
            height: user.height,
            applications: user.applications,
          });
        });
        return parsed;
      }),
    );
  }

  public addUser(user: IUser) {
    return this._http.post(`${this._api}/${ENDPOINTS.USERS}`, user);
  }

  public editUser(user: IUser) {
    user.uuid = undefined;
    user.applications = undefined;
    user.username = undefined;
    return this._http.put(`${this._api}/${ENDPOINTS.USERS}/${user.uuid}`, user);
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
