import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { REGEX } from 'app/constants/regex.constant';
import { StringHelper } from 'app/helpers/string.helper';
import { LoginModalComponent } from 'app/modules/layout/navbar/components/login-modal/login-modal.component';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';

@Component({
  selector: 'app-users-crud-modal',
  templateUrl: './users-crud-modal.component.html',
  styleUrl: './users-crud-modal.component.scss',
})
export class UsersCrudModalComponent {
  public userForm: FormGroup;
  public lengthValues = {
    heightMax: 200,
    heightMin: 50,
    passwordMaxLength: 20,
    passwordMinLenght: 4,
    stringMaxLength: 20,
    stringMinLength: 5,
  };

  constructor(private readonly _dialogRef: MatDialogRef<LoginModalComponent>) {
    this.userForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.maxLength(this.lengthValues.stringMaxLength),
          Validators.minLength(this.lengthValues.stringMinLength),
        ]),
        name: new FormControl(''),
        lastname: new FormControl(''),
        birthdate: new FormControl('', [
          Validators.required
        ]),
        height: new FormControl('', [
          Validators.required,
          Validators.max(this.lengthValues.heightMax),
          Validators.min(this.lengthValues.heightMin),
        ]),
        password: new FormControl('', [Validators.required]),
        controlPassword: new FormControl('', [Validators.required]),
      },
      this._checkPasswordValidator(),
    );

    console.log(this.userForm);
  }

  private _checkPasswordValidator(): Validators {
    if (this.userForm) {
      const pwdControl = this.userForm.controls[`password`];
      const pwdControlMatch = this.userForm.controls[`controlPassword`];
      return { notmatched: pwdControl.value !== pwdControlMatch.value ? true : false };
    }
    return { notmatched: false };
  }

  private _parseFormValues(): IUser {
    return {
      username: this.userForm.value.username,
      name: this.userForm.value.name,
      lastname: this.userForm.value.lastname,
      birthdate: REGEX.DB_DATE.test(this.userForm.value.birthdate)
        ? this.userForm.value.birthdate
        : StringHelper.parseDateToDB(this.userForm.value.birthdate),
      height: Number(this.userForm.value.height),
      password: StringHelper.encrypt(this.userForm.value.password),
    };
  }

  save() {
    // console.log(this._parseFormValues());
    console.log(this.userForm.value);
    Object.keys(this.userForm.controls).forEach((element) => {
      console.log(this.userForm.controls[element].errors);
    });
  }
}
