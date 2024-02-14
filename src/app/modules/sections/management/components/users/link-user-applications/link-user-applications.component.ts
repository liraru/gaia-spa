import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IApplication } from 'app/modules/sections/management/interfaces/applications.interface';
import { ApplicationService } from 'app/modules/sections/management/services/application.service';
import { UsersService } from 'app/modules/sections/management/services/users.service';
import { appInit } from 'ngx-webstorage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-link-user-applications',
  templateUrl: './link-user-applications.component.html',
  styleUrl: './link-user-applications.component.scss',
})
export class LinkUserApplicationsComponent implements OnDestroy, OnChanges {
  @Input('user') user: string = ``;
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

        if (this.user)
          this._applicationsService.getListByUser(this.user).subscribe({
            next: (appIds: string[]) => {
              appIds.forEach((appId: string) => this.assignStatus(appId, true));
              console.log(this.appList);
            },
            error: (error) => {
              // console.log(error);
            },
          });
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.user = changes['user'].currentValue;
    console.log(`USER ID -> ${this.user}`);
  }

  private assignStatus(appId: string, value: boolean) {
    const item = this.appList.find((f) => f.uuid === appId);
    if (item) {
      item.checked = value;
    }
  }

  onCheckChanged(app: string) {
    const status = this.appList.find(f => f.uuid === app)?.checked ?? false;
    console.log('onCheckChanged', this.user, app, status, this.appList);
    this.assignStatus(app, status);
    this._usersService.updateLinkedApplication(this.user, app, status);
  }

  ngOnDestroy(): void {
    this._appSub.unsubscribe();
  }
}
