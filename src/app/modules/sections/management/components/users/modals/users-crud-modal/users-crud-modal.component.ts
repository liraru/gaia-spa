import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { REGEX } from 'app/constants/regex.constant';
import { StringHelper } from 'app/helpers/string.helper';
import { LoginModalComponent } from 'app/modules/layout/navbar/components/login-modal/login-modal.component';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { UsersService } from 'app/modules/sections/management/services/users.service';

@Component({
  selector: 'app-users-crud-modal',
  templateUrl: './users-crud-modal.component.html',
  styleUrl: './users-crud-modal.component.scss',
})
export class UsersCrudModalComponent {
  private _user?: IUser;
  public modalTitle: string = '';
  public userForm: FormGroup;
  public onEdit: boolean = false;
  public username?: string;

  public lengthValues = {
    heightMax: 200,
    heightMin: 50,
    passwordMaxLength: 20,
    passwordMinLenght: 4,
    stringMaxLength: 20,
    stringMinLength: 5,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: IUser },
    private readonly _dialogRef: MatDialogRef<LoginModalComponent>,
    private readonly _usersService: UsersService,
    private readonly _translate: TranslateService,
  ) {
    this._checkIsEdit();
    this.modalTitle = this._translate.instant(`USER.USER`);
    console.log(this.onEdit, this._user);
    this.userForm = new FormGroup({
      username: new FormControl(this.onEdit ? this._user?.username : undefined, [
        Validators.required,
        Validators.maxLength(this.lengthValues.stringMaxLength),
        Validators.minLength(this.lengthValues.stringMinLength),
      ]),
      name: new FormControl(this.onEdit ? this._user?.name : undefined),
      lastname: new FormControl(this.onEdit ? this._user?.lastname : undefined),
      birthdate: new FormControl(this.onEdit ? this._user?.birthdate : '', [Validators.required]),
      height: new FormControl(this.onEdit ? this._user?.height : undefined, [
        Validators.required,
        Validators.max(this.lengthValues.heightMax),
        Validators.min(this.lengthValues.heightMin),
      ]),
      password: new FormControl(undefined, this.onEdit ? [Validators.required] : undefined),
      controlPassword: new FormControl(
        undefined,
        this.onEdit ? [Validators.required, this._checkPasswordValidator()] : undefined,
      ),
    });

    console.log('ON LOAD CONFIG');
    console.log('UNTOUCHED USER', this._user ?? 'NO HAY USER');
    console.log(this.userForm.value);
    console.log('IS EDITING', this.onEdit);
  }

  private _checkIsEdit() {
    if (this.data?.user) {
      this.onEdit = true;
      this._user = this.data.user;
      this.username = this._user?.username;
    }
  }

  private _checkPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.userForm) {
        return this.userForm.value.password !== control.value ? { notmatched: true } : null;
      }
      return null;
    };
  }

  private _parseFormValues(): IUser {
    return {
      username: this.userForm.value.username,
      name: this.userForm.value.name,
      lastname: this.userForm.value.lastname,
      birthdate: REGEX.DB_DATE.test(this.userForm.value.birthdate)
        ? this.userForm.value.birthdate
        : StringHelper.parseStringDate(this.userForm.value.birthdate),
      height: Number(this.userForm.value.height),
      password: StringHelper.encrypt(this.userForm.value.password),
    };
  }

  save() {
    if (this.onEdit) {
      
    } else {
      this._usersService.addUser(this._parseFormValues()).subscribe({
        next: (res) => this._dialogRef.close({ result: res }),
        error: (error) => console.error(error),
      });
    }
  }

  modalClose() {
    this._dialogRef.close();
  }
}
