import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { AcceptCancelModalComponent } from 'app/modules/@micro-modules/accept-cancel-modal/accept-cancel-modal/accept-cancel-modal.component';

@NgModule({
  declarations: [AcceptCancelModalComponent],
  imports: [CommonModule, TranslateModule.forChild(), MatButtonModule, MatDialogModule],
  exports: [AcceptCancelModalComponent],
})
export class AcceptCancelModalModule {}
