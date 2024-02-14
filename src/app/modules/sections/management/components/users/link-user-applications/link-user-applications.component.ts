import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { IApplication } from 'app/modules/sections/management/interfaces/applications.interface';
import { ApplicationService } from 'app/modules/sections/management/services/application.service';
import { UsersService } from 'app/modules/sections/management/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-link-user-applications',
  templateUrl: './link-user-applications.component.html',
  styleUrl: './link-user-applications.component.scss',
})
export class LinkUserApplicationsComponent implements OnDestroy, AfterViewInit {
  @Input() userId: string = ``;
  private _appSub: Subscription;
  private _userAppIds: string[] = [];
  public appList: { uuid: string; name: string; checked: boolean }[] = [];

  constructor(
    private readonly _applicationsService: ApplicationService,
    private readonly _usersService: UsersService,
  ) {
    this._appSub = this._applicationsService.getStoragedList().subscribe({
      next: (res: IApplication[]) => {
        this.appList = [];
        res.forEach((el: IApplication) => {
          this.appList.push({ uuid: el.uuid, name: el.key, checked: false });
        });
      },
    });

    if (this.userId)
      this._applicationsService.getListByUser(this.userId).subscribe({
        next: (appIds: string[]) => {
          appIds.forEach((appId: string) => {
            const item = this.appList.find((f) => f.uuid === appId);
            if (item) {
              item.checked = true;
            }
          });
        },
        error: (error) => {
          alert(error);
        },
      });
  }

  onCheckChanged(app: string, status: boolean) {
    console.log(this.userId, app, status);
    // this._usersService.updateLinkedApplication(this.userId, app, status);
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    this._appSub.unsubscribe();
  }
}
