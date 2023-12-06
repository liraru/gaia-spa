import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU } from '../../../../../constants/menu.constant';
import { IMenuItem } from '../../../../../interfaces/menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(private _route: ActivatedRoute) {
    console.log(this._route);
  }

  public menu: IMenuItem[] = MENU;
  public lastItem: IMenuItem = MENU[MENU.length - 1];
  public current: string = ``;

  public onItemChange(item: IMenuItem) {
    this.current = item.route;
  }
}
