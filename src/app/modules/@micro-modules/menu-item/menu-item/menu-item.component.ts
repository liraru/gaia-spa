import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MENU } from 'app/constants/menu.constant';
import { IMenuItem } from 'app/interfaces/menu-item.interface';
import { NavigationStatusService } from 'app/services/navigation-status.service';

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

  constructor(
    private readonly _navigationStatusService: NavigationStatusService
  ) {
    this.item = MENU[0];
  }

  public setRoute(item: IMenuItem) {
    this._navigationStatusService.setActiveMenuItem(item);
    this.onItemChange.emit(item.code);
  }
}
