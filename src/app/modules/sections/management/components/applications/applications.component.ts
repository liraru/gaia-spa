import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DIALOG_BASE_CONFIG } from 'app/constants/dialog-config.constant';
import { ICONS } from 'app/constants/icons.constant';
import { ArrayHelper } from 'app/helpers/array.helper';
import { AcceptCancelModalComponent } from 'app/modules/@micro-modules/accept-cancel-modal/accept-cancel-modal/accept-cancel-modal.component';
import { ApplicationsModalComponent } from 'app/modules/sections/management/components/applications/modals/applications-modal/applications-modal.component';
import { IApplication } from 'app/modules/sections/management/interfaces/applications.interface';
import { ApplicationService } from 'app/modules/sections/management/services/application.service';
import { application } from 'express';

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
    this._getAll();
  }

  sort(sort: Sort) {}

  private _getAll() {
    this._applicationService.getList().subscribe({
      next: (applications: IApplication[]) => {
        this._applications = applications;
        this.sortedApplications.data = ArrayHelper.Sort(
          { active: `name`, direction: `asc` },
          this._applications.map((app: IApplication) => {
            return {
              uuid: app.uuid,
              image: `assets/images/${app.image}`,
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

  onAdd() {
    const dialogRef = this._dialog.open(ApplicationsModalComponent, {
      data: { list: this._applications },
    });
    dialogRef.afterClosed().subscribe({
      next: () => {
        this._getAll();
      },
      error: (error) => console.error(error),
    });
  }

  edit(app: IApplication) {
    const dialogRef = this._dialog.open(ApplicationsModalComponent, {
      data: {
        list: this._applications,
        application: this._applications.find((f: IApplication) => f.uuid === app.uuid),
      },
    });
    dialogRef.afterClosed().subscribe({
      next: () => {
        this._getAll();
      },
      error: (error) => console.error(error),
    });
  }

  delete(app: IApplication) {
    console.log(app);
    const dialogConfig: MatDialogConfig = DIALOG_BASE_CONFIG;
    dialogConfig.data = {
      title: this._translate.instant(`APPLICATION.DELETE_TITLE`),
      question: this._translate.instant(`APPLICATION.DELETE_SPECIFIC_QUESTION`, {
        name: app.name,
      }),
    };

    const dialogRef = this._dialog.open(AcceptCancelModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result && app.uuid) {
          this._applicationService.delete(app.uuid).subscribe({
            next: () => {
              alert(`aplicación eliminada`);
              this._getAll();
            },
          });
        }
      },
    });
  }
}
