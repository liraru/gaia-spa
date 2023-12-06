import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MENU } from '../../../../constants/menu.constant';
import { IMenuItem } from '../../../../interfaces/menu-item.interface';
import { NavigationStatusService } from '../../../../services/navigation-status.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() item: IMenuItem;
  @Input() isActive: boolean = false;
  @Output() onItemChange: EventEmitter<string> = new EventEmitter<string>();

  public icons = [];

  constructor(private readonly _navigationStatusService: NavigationStatusService) {
    this.item = MENU[0];
    this._navigationStatusService.getActiveMenuItem().subscribe((item: IMenuItem) => (this.item = item));
  }

  public setRoute(item: IMenuItem) {
    this._navigationStatusService.setActiveMenuItem(item);
    this.onItemChange.emit(item.code);
  }
}
