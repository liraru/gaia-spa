import { Component, OnDestroy } from '@angular/core';
import { IApplication } from 'app/modules/sections/management/interfaces/applications.interface';
import { ApplicationService } from 'app/modules/sections/management/services/application.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-link-user-applications',
  templateUrl: './link-user-applications.component.html',
  styleUrl: './link-user-applications.component.scss',
})
export class LinkUserApplicationsComponent implements OnDestroy {
  private _appSub: Subscription;
  public appList: IApplication[] = [];

  constructor(private readonly _applicationsService: ApplicationService) {
    this._appSub = this._applicationsService
      .getStoragedList()
      .subscribe({ next: (res: IApplication[]) => (this.appList = res) });
  }

  ngOnDestroy(): void {
    this._appSub.unsubscribe();
  }
}
