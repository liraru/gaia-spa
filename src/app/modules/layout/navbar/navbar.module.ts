import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginService } from './services/login.service';
import { CommonBusService } from 'app/services/common-bus.service';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [NavbarComponent, LoginModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    // ↓ MATERIAL ↓ //
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [LoginService, CommonBusService],
  exports: [NavbarComponent]
})
export class NavbarModule {}
