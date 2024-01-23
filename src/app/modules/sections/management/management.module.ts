import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { AcceptCancelModalModule } from 'app/modules/@micro-modules/accept-cancel-modal/accept-cancel-modal.module';
import { ManagementComponent } from 'app/modules/sections/management/components/management/management.component';
import { ManagementRoutingModule } from 'app/modules/sections/management/management-routing.module';
import { ApplicationsComponent } from './components/applications/list/applications.component';
import { ApplicationsModalComponent } from './components/applications/applications-modal/applications-modal.component';
import { UsersFormComponent } from 'app/modules/sections/management/components/users/users-form/users-form.component';
import { UsersComponent } from 'app/modules/sections/management/components/users/users/users.component';
import { LinkUserApplicationsComponent } from './components/users/link-user-applications/link-user-applications.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ApplicationsComponent,
    ManagementComponent,
    UsersComponent,
    UsersFormComponent,
    ApplicationsModalComponent,
    LinkUserApplicationsComponent,
  ],
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
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule,
    // ↓ MICROMODULES ↓ //
    AcceptCancelModalModule,
  ],
})
export class ManagementModule {}
