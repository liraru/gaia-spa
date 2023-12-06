import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MENU } from '../../../../../constants/menu.constant';
import { IMenuItem } from '../../../../../interfaces/menu-item.interface';
import { NavigationStatusService } from '../../../../../services/navigation-status.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnDestroy {
  private _currentRouteSubs: Subscription;
  private _currentItem?: IMenuItem;
  public menu: IMenuItem[] = MENU;
  public lastItem: IMenuItem = MENU[MENU.length - 1];
  public current: string = ``;

  constructor(private _route: Router, private _navitagionStatusSerivce: NavigationStatusService) {
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
