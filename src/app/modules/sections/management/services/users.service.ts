import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _api = environment.api;

  constructor(private readonly _http: HttpClient) {}
}
