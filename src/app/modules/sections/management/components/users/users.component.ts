import { Component } from '@angular/core';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  public tableHeaders: string[] = ['USERNAME', 'NAME', 'LASTNAME', 'BIRTHDATE'];
  public displayedColumns: string[] = [
    'username',
    'name',
    'lastname',
    'birthdate'
  ];

  public users: IUser[] = [];

  constructor() {}

  private _loadUsers() {}
}
