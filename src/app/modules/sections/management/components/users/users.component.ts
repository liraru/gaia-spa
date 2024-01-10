import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ICONS } from 'app/constants/icons.constant';
import { UsersCrudModalComponent } from 'app/modules/sections/management/components/users/modals/users-crud-modal/users-crud-modal.component';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { UsersService } from 'app/modules/sections/management/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit {
  private _users: IUser[] = [];
  public ICONS = ICONS;
  public sortedUsers: IUser[] = [];
  public displayedColumns: string[] = ['username', 'fullname', 'birthdate', 'height', 'actions'];

  constructor(private readonly _usersService: UsersService, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this._loadUsers();
  }

  private _loadUsers() {
    this._usersService.getUsersList().subscribe({
      next: (users: any) => {
        this.sortedUsers = this._users = users;
      },
      error: (err) => console.error(err)
    });
  }

  private _compare(a?: number | string, b?: number | string, isAsc: boolean = true) {
    if (!a || !b) {
      return 0;
    }

    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this._users;
    console.log(data);
    if (!sort.active || sort.direction === '') {
      this.sortedUsers = data;
      return;
    }

    this.sortedUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username':
          return this._compare(a.username, b.username, isAsc);
        case 'fullname':
          return this._compare(a.fullname, b.fullname, isAsc);
        case 'birthdate':
          return this._compare(a.birthdate, b.birthdate, isAsc);
        case 'height':
          return this._compare(a.height, b.height, isAsc);
        default:
          return 0;
      }
    });

    console.log(this.sortedUsers);
  }

  addUser() {
    const dialogRef = this.dialog.open(UsersCrudModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._loadUsers();
      }
    });
  }

  onRowClick(user: string) {}
}
