import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ICONS } from 'app/constants/icons.constant';
import { IApplication } from 'app/modules/sections/management/interfaces/applications.interface';
import { ApplicationService } from 'app/modules/sections/management/services/application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss',
})
export class ApplicationsComponent {
  private _applications: IApplication[] = [];
  public ICONS = ICONS;
  public sortedUsers: MatTableDataSource<IApplication> = new MatTableDataSource<IApplication>([]);
  public displayedColumns: string[] = [`image`, `code`, `name`, `users`, 'actions'];

  constructor(
    private readonly _applicationService: ApplicationService,
    private readonly _dialog: MatDialog,
    private readonly _translate: TranslateService,
  ) {}

  sort(sort: Sort) {}

  add() {}

  edit(app: IApplication) {}

  delete(app: IApplication) {}
}
