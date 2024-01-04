import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/constants/endpoints.constant';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _api = environment.api;

  constructor(private readonly _http: HttpClient) {}

  public getUsersList() {
    return this._http.get(`${this._api}/${ENDPOINTS.USERS_LIST}`).pipe(
      map((resp: any) => {
        const user: IUser = {
          uuid: resp.uuid,
          username: resp.username,
          name: resp.name,
          lastname: resp.lastname,
          fullname: `${resp.name} ${resp.lastname}`,
          birthdate: resp.birthdate,
          height: resp.height,
          applications: resp.applications
        };
        return user;
      })
    );
  }
}
