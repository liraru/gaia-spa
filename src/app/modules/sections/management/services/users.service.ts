import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'app/constants/endpoints.constant';
import { StringHelper } from 'app/helpers/string.helper';
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
        const parsed: IUser[] = [];
        resp.forEach((user: any) => {
          parsed.push({
            uuid: user.uuid,
            username: user.username,
            name: user.name,
            lastname: user.lastname,
            fullname: `${user.name} ${user.lastname}`,
            birthdate: StringHelper.parseDBDate(user.birthdate),
            height: user.height,
            applications: user.applications
          });
        });
        console.log('PARSED', parsed);
        return parsed;
      })
    );
  }
}
