import { AfterViewInit, Component } from '@angular/core';
import { ICONS } from 'app/constants/icons.constant';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { UsersService } from 'app/modules/sections/management/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit {
  public ICONS = ICONS;
  public tableHeaders: string[] = [
    'USERNAME',
    'FULLNAME',
    'BIRTHDATE',
    'HEIGHT'
  ];

  public users: IUser[] = [];

  constructor(private readonly _usersService: UsersService) {}

  ngAfterViewInit(): void {
    this._loadUsers();
  }

  private sortUsersBy(header: string) {}

  private _loadUsers() {
    this._usersService.getUsersList().subscribe({
      next: (users: any) => (this.users = users),
      error: (err) => console.error(err)
    });
  }

  onHeaderClick(header: string) {}

  onRowClick(user: string) {}
}
