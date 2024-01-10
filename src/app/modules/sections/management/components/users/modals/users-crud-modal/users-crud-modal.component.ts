import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StringHelper } from 'app/helpers/string.helper';
import { LoginModalComponent } from 'app/modules/layout/navbar/components/login-modal/login-modal.component';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';

@Component({
  selector: 'app-users-crud-modal',
  templateUrl: './users-crud-modal.component.html',
  styleUrl: './users-crud-modal.component.scss'
})
export class UsersCrudModalComponent {
  public userForm: FormGroup;

  constructor(private readonly _dialogRef: MatDialogRef<LoginModalComponent>) {
    this.userForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        birthdate: new FormControl('', Validators.required),
        height: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        controlPassword: new FormControl('', [Validators.required])
      },
      this._checkPasswordValidator()
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
      username: this.userForm.controls['username'].value,
      name: this.userForm.controls['name'].value,
      lastname: this.userForm.controls['lastname'].value,
      birthdate: StringHelper.parseDateToDB(this.userForm.controls['birthdate'].value),
      height: Number(this.userForm.controls['height'].value),
      password: StringHelper.encrypt(this.userForm.controls['password'].value)
    };
  }

  save() {
    console.log(this._parseFormValues());
  }
}
