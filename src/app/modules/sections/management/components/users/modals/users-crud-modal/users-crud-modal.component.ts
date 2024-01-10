import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  public userForm: FormGroup;
  public lengthValues = {
    heightMax: 200,
    heightMin: 50,
    passwordMaxLength: 20,
    passwordMinLenght: 4,
    stringMaxLength: 20,
    stringMinLength: 5,
  };

  constructor(
    private readonly _dialogRef: MatDialogRef<LoginModalComponent>,
    private readonly _usersService: UsersService,
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.lengthValues.stringMaxLength),
        Validators.minLength(this.lengthValues.stringMinLength),
      ]),
      name: new FormControl(''),
      lastname: new FormControl(''),
      birthdate: new FormControl('', [Validators.required]),
      height: new FormControl('', [
        Validators.required,
        Validators.max(this.lengthValues.heightMax),
        Validators.min(this.lengthValues.heightMin),
      ]),
      password: new FormControl('', [Validators.required]),
      controlPassword: new FormControl('', [
        Validators.required,
        this._checkPasswordValidator(),
      ]),
    });

    console.log(this.userForm);
  }

  private _checkPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.userForm) {
        return this.userForm.value.password !== control.value
          ? { notmatched: true }
          : null;
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
        : StringHelper.parseDateToDB(this.userForm.value.birthdate),
      height: Number(this.userForm.value.height),
      password: StringHelper.encrypt(this.userForm.value.password),
    };
  }

  save() {
    // console.log(this.userForm.value);
    // Object.keys(this.userForm.controls).forEach((element) => {
    //   console.log(this.userForm.controls[element].errors);
    // });
    this._usersService.addUser(this._parseFormValues()).subscribe({
      next: (res) => {
        console.log(res);
        this._dialogRef.close({ result: res });
      },
      error: (error) => console.error(error),
    });
  }
}
