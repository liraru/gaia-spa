import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, TranslateModule.forChild()],
  exports: [NavbarComponent]
})
export class NavbarModule {}
