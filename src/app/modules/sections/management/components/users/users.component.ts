import { AfterViewInit, Component } from '@angular/core';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { UsersService } from 'app/modules/sections/management/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit {
  public tableHeaders: string[] = ['username', 'fullname', 'birthdate', 'height'];
  public displayedColumns: string[] = [
    'username',
    'fullname',
    'birthdate',
    'height'
  ];

  public users: IUser[] = [];

  constructor(private readonly _usersService: UsersService) {}

  ngAfterViewInit(): void {
    this._loadUsers();
  }

  private _loadUsers() {
    this._usersService.getUsersList().subscribe({
      next: (users: any) => (this.users = users),
      error: (err) => console.error(err)
    });
  }
}
