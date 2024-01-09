import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MENU } from 'app/constants/menu.constant';
import { IMenuItem } from 'app/interfaces/menu-item.interface';
import { LoginService } from 'app/modules/layout/navbar/services/login.service';
import { CommonBusService } from 'app/services/common-bus.service';
import { NavigationStatusService } from 'app/services/navigation-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnDestroy {
  private _currentItem?: IMenuItem;
  private _currentRouteSubs: Subscription;
  private _loginSubs: Subscription;
  public current: string = ``;
  public isLogged: boolean = false;
  public lastItem: IMenuItem = MENU[MENU.length - 1];
  public menu: IMenuItem[] = MENU;

  constructor(
    private readonly _route: Router,
    private readonly _navitagionStatusSerivce: NavigationStatusService,
    private readonly _commonBus: CommonBusService
  ) {
    this._loginSubs = this._commonBus
      .getAccessToken()
      .subscribe((token: any) => {
        this.isLogged = token?.length > 0;
      });

    this._currentRouteSubs = this._route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const route = event.url.substring(1, event.url.length);
        MENU.forEach((item: IMenuItem) => {
          if (item.route === route) {
            this._currentItem = item;
          } else if (item.innerRoutes) {
            item.innerRoutes.forEach((inner: IMenuItem) => {
              if (inner.route === route) {
                this._currentItem = inner;
              }
            });
          }

          if (this._currentItem) {
            this.current = this._currentItem.route;
            this._navitagionStatusSerivce.setActiveMenuItem(this._currentItem);
          }
        });
      }
    });
  }

  public onItemChange(item: IMenuItem) {
    this.current = item.route;
  }

  ngOnDestroy(): void {
    this._currentRouteSubs.unsubscribe();
  }
}
