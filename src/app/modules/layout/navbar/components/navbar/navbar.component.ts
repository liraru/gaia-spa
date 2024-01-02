import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IMAGE_ROUTES } from 'app/constants/image-routes.constant';
import { APP_ROUTES } from 'app/constants/routes.constant';
import { IMenuItem } from 'app/interfaces/menu-item.interface';
import { LoginModalComponent } from 'app/modules/layout/navbar/components/login-modal/login-modal.component';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { CommonBusService } from 'app/services/common-bus.service';
import { NavigationStatusService } from 'app/services/navigation-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private _currentUserSubs?: Subscription;
  private _pageNameSubs?: Subscription;
  public buttonText: string = `LOG_IN`;
  public currentPageName: string = ``;
  public icon: string = IMAGE_ROUTES.GAIA_LOGO;
  public isLogged: boolean = false;
  public link: string = APP_ROUTES.DASHBOARD;
  public username: string = '';

  constructor(
    private readonly _navigationStatusService: NavigationStatusService,
    private readonly _commonBus: CommonBusService,
    public dialog: MatDialog
  ) {
    this._pageNameSubs = this._navigationStatusService
      .getActiveMenuItem()
      .subscribe({
        next: (item: IMenuItem) =>
          (this.currentPageName = item.buttonName.toLocaleUpperCase())
      });
  }

  ngAfterViewInit(): void {
    console.log('this._currentUserSubs ngAfterViewInit');
    this._currentUserSubs = this._commonBus.getCurrentUser().subscribe({
      next: (user: IUser) => {
        console.log('_currentUserSubs', user);
        this.username = user.username;
        this.isLogged = this.username !== '';
      }
    });
  }

  public openLogin() {
    const dialogRef = this.dialog.open(LoginModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.isLogged = result.isLogged;
        this.username = result.username;
      }
    });
  }

  public openUserMenu() {
    console.log('open menu click');
  }

  ngOnDestroy(): void {
    this._pageNameSubs?.unsubscribe();
    this._currentUserSubs?.unsubscribe();
  }
}
