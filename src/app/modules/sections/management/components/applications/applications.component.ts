import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ICONS } from 'app/constants/icons.constant';
import { ArrayHelper } from 'app/helpers/array.helper';
import { IApplication } from 'app/modules/sections/management/interfaces/applications.interface';
import { ApplicationService } from 'app/modules/sections/management/services/application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss',
})
export class ApplicationsComponent implements AfterViewInit {
  private _applications: IApplication[] = [];
  public ICONS = ICONS;
  public sortedApplications: MatTableDataSource<IApplication> = new MatTableDataSource<IApplication>([]);
  public displayedColumns: string[] = [`image`, `code`, `name`, `description`, `actions`];

  constructor(
    private readonly _applicationService: ApplicationService,
    private readonly _dialog: MatDialog,
    private readonly _translate: TranslateService,
  ) {}

  ngAfterViewInit(): void {
    this.getAll();
  }

  sort(sort: Sort) {}

  getAll() {
    this._applicationService.getList().subscribe({
      next: (applications: IApplication[]) => {
        this._applications = applications;
        this.sortedApplications.data = ArrayHelper.Sort(
          { active: `name`, direction: `asc` },
          this._applications.map((app: IApplication) => {
            return {
              uuid: app.uuid,
              image: app.image,
              code: app.code,
              name: app.key,
              description: app.description ?? '',
            };
          }),
        );
        console.log(this.sortedApplications.data);
      },
      error: (error) => console.error(error),
    });
  }

  add() {}

  edit(app: IApplication) {}

  delete(app: IApplication) {}
}
