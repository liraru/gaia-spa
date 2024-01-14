import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { DIALOG_BASE_CONFIG } from 'app/constants/dialog-config.constant';
import { ICONS } from 'app/constants/icons.constant';
import { AcceptCancelModalComponent } from 'app/modules/@micro-modules/accept-cancel-modal/accept-cancel-modal/accept-cancel-modal.component';
import { UsersCrudModalComponent } from 'app/modules/sections/management/components/users/modals/users-crud-modal/users-crud-modal.component';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { UsersService } from 'app/modules/sections/management/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements AfterViewInit {
  private _users: IUser[] = [];
  public ICONS = ICONS;
  public sortedUsers: IUser[] = [];
  public displayedColumns: string[] = ['username', 'fullname', 'birthdate', 'height', 'actions'];

  constructor(
    private readonly _usersService: UsersService,
    private readonly _dialog: MatDialog,
    private readonly _translate: TranslateService,
  ) {}

  ngAfterViewInit(): void {
    this._loadUsers();
  }

  private _loadUsers() {
    this._usersService.getUsersList().subscribe({
      next: (users: any) => {
        this.sortedUsers = this._users = users;
      },
      error: (err) => console.error(err),
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
  }

  addUser() {
    const dialogRef = this._dialog.open(UsersCrudModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._loadUsers();
      }
    });
  }

  editUser(user: IUser) {
    console.log(user);
    const dialogRef = this._dialog.open(UsersCrudModalComponent, {
      data: { user: this._users.find((f) => (f.uuid = user.uuid)) },
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        console.log('ON EDIT RESULT', result);
      },
    });
  }

  deleteUser(user: IUser) {
    console.log('ON DELETE', user);

    const dialogConfig: MatDialogConfig = DIALOG_BASE_CONFIG;
    dialogConfig.data = {
      title: this._translate.instant(`USER.DELETE_USER_TITLE`),
      question: this._translate.instant(`USER.DELETE_USER_SPECIFIC_QUESTION`, {
        username: user.username,
      }),
    };

    const dialogRef = this._dialog.open(AcceptCancelModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result && user.uuid) {
          this._usersService.deleteUser(user.uuid).subscribe({
            next: () => {
              alert(`usuario borrado`);
              this._loadUsers();
            },
          });
        }
        console.log('ON DELETE RESULT', result);
      },
    });
  }
}
