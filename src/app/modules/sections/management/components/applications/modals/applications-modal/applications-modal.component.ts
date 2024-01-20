import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IApplication } from 'app/modules/sections/management/interfaces/applications.interface';
import { ApplicationService } from 'app/modules/sections/management/services/application.service';

@Component({
  selector: 'app-applications-modal',
  templateUrl: './applications-modal.component.html',
  styleUrl: './applications-modal.component.scss',
})
export class ApplicationsModalComponent {
  private _application?: IApplication;
  public list: IApplication[] = [];
  public modalTitle: string = '';
  public applicationForm: FormGroup;
  public onEdit: boolean = false;
  public applicationName?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { application: IApplication; list: IApplication[] },
    private readonly _dialogRef: DialogRef,
    private readonly _applicationsService: ApplicationService,
    private readonly _translate: TranslateService,
  ) {
    this._checkIsEdit();
    this.applicationForm = this._buildForm();
  }

  private _checkIsEdit() {
    this.list = this.data.list;
    if (this.data?.application) {
      this.onEdit = true;
      this._application = this.data.application;
      this.applicationName = this._application.name;
    } else {
      this.modalTitle = this._translate.instant(`APPLICATION.NEW`)
    }
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      code: new FormControl(this.onEdit ? this._application?.code : ``, [Validators.required]),
      key: new FormControl(this.onEdit ? this._application?.key : ``, [Validators.required]),
      description: new FormControl(this.onEdit ? this._application?.description : ``, [
        Validators.required,
      ]),
      route: new FormControl(this.onEdit ? this._application?.route : ``, [Validators.required]),
      parent: new FormControl(this.onEdit ? this._application?.parentApplication : undefined),
      image: new FormControl(this.onEdit ? this._application?.image : undefined, [Validators.required]),
    });
  }

  private _parseFormValues(): IApplication {
    return {
      code: this.applicationForm.value.code,
      key: `${this.applicationForm.value.key}`,
      description: this.applicationForm.value.description,
      route: this.applicationForm.value.route,
      parentApplication: this.applicationForm.value.parent,
      image: this.applicationForm.value.image,
    };
  }

  onSave() {
    const app = this._parseFormValues();
    if (this.onEdit) {
      this._applicationsService.edit(app).subscribe({
        next: (resp) => this._dialogRef.close(resp),
        error: (error) => console.error(error),
      });
    } else {
      this._applicationsService.add(app).subscribe({
        next: (resp) => this._dialogRef.close(resp),
        error: (error) => console.error(error),
      });
    }
  }

  onModalClose() {
    this._dialogRef.close(undefined);
  }
}
