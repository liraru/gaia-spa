import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-accept-cancel-modal',
  templateUrl: './accept-cancel-modal.component.html',
  styleUrl: './accept-cancel-modal.component.scss',
})
export class AcceptCancelModalComponent {
  public title: string;
  public question: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; question: string },
    private readonly _dialogRef: MatDialogRef<AcceptCancelModalComponent>,
  ) {
    this._dialogRef.disableClose = true;
    this.title = data.title ?? '';
    this.question = data.question ?? '';
  }

  onActionClick(acepted: boolean) {
    this._dialogRef.close(acepted);
  }
}
