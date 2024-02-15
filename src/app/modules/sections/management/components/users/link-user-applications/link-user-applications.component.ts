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
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { ApplicationService } from 'app/modules/sections/management/services/application.service';
import { UsersService } from 'app/modules/sections/management/services/users.service';
import { appInit } from 'ngx-webstorage';
import { Subscription } from 'rxjs';

interface IApp {
  uuid: string;
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-link-user-applications',
  templateUrl: './link-user-applications.component.html',
  styleUrl: './link-user-applications.component.scss',
})
export class LinkUserApplicationsComponent implements OnDestroy, OnChanges {
  @Input('user') user?: IUser;
  private _appSub: Subscription;
  private _userAppIds: string[] = [];
  public appList: IApp[] = [];

  constructor(
    private readonly _applicationsService: ApplicationService,
    private readonly _usersService: UsersService,
  ) {
    this._appSub = this._applicationsService.getStoragedList().subscribe({
      next: (res: IApplication[]) => {
        this.appList = [];
        res.forEach((el: IApplication) => {
          this.appList.push({
            uuid: el.uuid,
            name: el.key,
            checked: false,
          });
        });
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.user = changes['user'].currentValue;
    this.appList.forEach((app: IApp) => {
      const status = this.user?.applications?.find((f) => f === app.uuid);
      app.checked = status === app.uuid;
    });
  }

  private _assignStatus(appId: string, value: boolean) {
    const item = this.appList.find((f) => f.uuid === appId);
    if (item) {
      item.checked = value;
    }
  }

  onCheckChanged(app: string) {
    const status = this.appList.find((f) => f.uuid === app)?.checked ?? false;
    this._assignStatus(app, status);
    this._usersService
      .updateLinkedApplication(this.user?.uuid ?? ``, app, status)
      .subscribe({ next: () => {}, error: (error) => console.log(error) });
  }

  ngOnDestroy(): void {
    this._appSub.unsubscribe();
  }
}
