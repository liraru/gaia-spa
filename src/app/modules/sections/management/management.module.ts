import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { ManagementComponent } from 'app/modules/sections/management/components/management/management.component';
import { UsersComponent } from 'app/modules/sections/management/components/users/users.component';
import { ManagementRoutingModule } from 'app/modules/sections/management/management-routing.module';
import { ApplicationsComponent } from './components/applications/applications.component';

@NgModule({
  declarations: [ManagementComponent, UsersComponent, ApplicationsComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    TranslateModule.forChild(),
    FontAwesomeModule
  ]
})
export class ManagementModule {}
