import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMAGE_ROUTES } from '../../../../../constants/image-routes.constant';
import { APP_ROUTES } from '../../../../../constants/routes.constant';
import { IMenuItem } from '../../../../../interfaces/menu-item.interface';
import { NavigationStatusService } from '../../../../../services/navigation-status.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {
  private _pageNameSubs: Subscription;
  public icon: string = IMAGE_ROUTES.GAIA_LOGO;
  public link: string = APP_ROUTES.DASHBOARD;
  public currentPageName: string = ``;

  constructor(private readonly _navigationStatusService: NavigationStatusService) {
    this._pageNameSubs = this._navigationStatusService
      .getActiveMenuItem()
      .subscribe((item: IMenuItem) => (this.currentPageName = item.buttonName.toLocaleUpperCase()));
  }

  ngOnDestroy(): void {
    this._pageNameSubs?.unsubscribe();
  }
}
