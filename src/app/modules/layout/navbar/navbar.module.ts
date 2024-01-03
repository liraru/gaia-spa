import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { CommonBusService } from 'app/services/common-bus.service';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [NavbarComponent, LoginModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    FontAwesomeModule,
    // ↓ MATERIAL ↓ //
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [LoginService, CommonBusService],
  exports: [NavbarComponent]
})
export class NavbarModule {}
