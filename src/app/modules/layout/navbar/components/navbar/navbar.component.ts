import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS } from 'app/constants/icons.constant';
import { IMAGE_ROUTES } from 'app/constants/image-routes.constant';
import { APP_ROUTES } from 'app/constants/routes.constant';
import { IMenuItem } from 'app/interfaces/menu-item.interface';
import { LoginModalComponent } from 'app/modules/layout/navbar/components/login-modal/login-modal.component';
import { LoginService } from 'app/modules/layout/navbar/services/login.service';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { CommonBusService } from 'app/services/common-bus.service';
import { NavigationStatusService } from 'app/services/navigation-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {
  private _currentUserSubs?: Subscription;
  private _pageNameSubs?: Subscription;
  public buttonText: string = `LOG_IN`;
  public currentPageName: string = ``;
  public icon: string = IMAGE_ROUTES.GAIA_LOGO;
  public isLogged: boolean = false;
  public link: string = APP_ROUTES.DASHBOARD;
  public username?: string = '';
  public ICONS = ICONS;

  constructor(
    private readonly _$commonBus: CommonBusService,
    private readonly _$navigationStatusService: NavigationStatusService,
    private readonly _iconRegistry: MatIconRegistry,
    private readonly _loginService: LoginService,
    private readonly _sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    this._pageNameSubs = this._$navigationStatusService
      .getActiveMenuItem()
      .subscribe({
        next: (item: IMenuItem) =>
          (this.currentPageName = item.buttonName.toLocaleUpperCase())
      });

    this._currentUserSubs = this._$commonBus.getCurrentUser().subscribe({
      next: (user: IUser | undefined) => {
        this.username = user?.username ?? '';
        this.isLogged = this.username !== '';
      }
    });
  }

  public openLogin() {
    const dialogRef = this.dialog.open(LoginModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLogged = result.isLogged;
        this.username = result.username;
      }
    });
  }

  public openUserProfile() {
    alert('open menu click');
  }

  logOut() {
    this._loginService.logout();
  }

  ngOnDestroy(): void {
    this._pageNameSubs?.unsubscribe();
    this._currentUserSubs?.unsubscribe();
  }
}
