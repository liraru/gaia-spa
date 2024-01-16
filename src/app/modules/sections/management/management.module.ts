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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    MatRadioModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    // ↓ MICROMODULES ↓ //
    AcceptCancelModalModule,
  ],
})
export class ManagementModule {}
