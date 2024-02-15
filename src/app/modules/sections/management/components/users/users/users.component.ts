import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DIALOG_BASE_CONFIG } from 'app/constants/dialog-config.constant';
import { ICONS } from 'app/constants/icons.constant';
import { ArrayHelper } from 'app/helpers/array.helper';
import { AcceptCancelModalComponent } from 'app/modules/@micro-modules/accept-cancel-modal/accept-cancel-modal/accept-cancel-modal.component';
import { UsersFormComponent } from 'app/modules/sections/management/components/users/users-form/users-form.component';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { UsersService } from 'app/modules/sections/management/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements AfterViewInit {
  private _users: IUser[] = [];
  public ICONS = ICONS;
  public sortedUsers: MatTableDataSource<IUser> = new MatTableDataSource<IUser>([]);
  public displayedColumns: string[] = ['username', 'fullname', 'birthdate', 'height'];
  public columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  public expandedElement?: IUser;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _translate: TranslateService,
    private readonly _usersService: UsersService,
  ) {}

  ngAfterViewInit(): void {
    this.dataLoad();
  }

  public dataLoad() {
    this._usersService.getUsersList().subscribe({
      next: (users: any) => {
        this._users = users;
        this.sortData({ active: `username`, direction: `asc` });
      },
      error: (err) => console.error(err),
    });
  }

  private _dataUpdated(users: IUser[]) {
    this._users = users;
    this.sortData({ active: `username`, direction: `asc` });
  }

  sortData(sort: Sort) {
    const data = this._users;
    if (!sort.active || sort.direction === '') {
      this.sortedUsers.data = data;
      return;
    }
    this.sortedUsers.data = ArrayHelper.Sort(sort, this._users);
  }

  toUpperCase(lowerCase: string): string {
    return lowerCase.toUpperCase();
  }

  onAdd() {
    const dialogRef = this._dialog.open(UsersFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (result: any) => this._dataUpdated(result.result),
      error: (error) => console.error(error),
    });
  }

  onAssign() {}

  onEdit(user: IUser) {
    const dialogRef = this._dialog.open(UsersFormComponent, {
      data: { user: this._users.find((f) => f.uuid === user.uuid) },
    });

    dialogRef.afterClosed().subscribe({
      next: (result: { result: IUser[] }) => this._dataUpdated(result.result),
    });
  }

  deleteUser(user: IUser) {
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
              console.log(`usuario borrado`);
              this.dataLoad();
            },
          });
        }
      },
    });
  }
}
