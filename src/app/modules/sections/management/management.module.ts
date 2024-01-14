import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { AcceptCancelModalModule } from 'app/modules/@micro-modules/accept-cancel-modal/accept-cancel-modal.module';
import { ManagementComponent } from 'app/modules/sections/management/components/management/management.component';
import { UsersComponent } from 'app/modules/sections/management/components/users/users.component';
import { ManagementRoutingModule } from 'app/modules/sections/management/management-routing.module';
import { ApplicationsComponent } from './components/applications/applications.component';
import { UsersCrudModalComponent } from './components/users/modals/users-crud-modal/users-crud-modal.component';

@NgModule({
  declarations: [ApplicationsComponent, ManagementComponent, UsersComponent, UsersCrudModalComponent],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    // ↓ MATERIAL ↓ //
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    // ↓ MICROMODULES ↓ //
    AcceptCancelModalModule,
  ],
})
export class ManagementModule {}
