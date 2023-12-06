import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MENU } from '../../../constants/menu.constant';
import { IMenuItem } from '../../../interfaces/menu-item.interface';
import { MenuItemModule } from '../../@micro-modules/menu-item/menu-item.module';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, RouterModule, MenuItemModule],
  exports: [MenuComponent]
})
export class MenuModule {
  public menu: IMenuItem[] = MENU;
}
