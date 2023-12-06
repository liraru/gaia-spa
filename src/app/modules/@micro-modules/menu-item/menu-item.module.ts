import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  declarations: [MenuItemComponent],
  imports: [CommonModule, RouterModule, TranslateModule.forChild()],
  exports: [MenuItemComponent]
})
export class MenuItemModule {}
