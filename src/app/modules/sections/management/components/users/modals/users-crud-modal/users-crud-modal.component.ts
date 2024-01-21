import { Component, Inject } from '@angular/core';
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
    private readonly _dialogRef: MatDialogRef<UsersCrudModalComponent>,
    private readonly _usersService: UsersService,
    private readonly _translate: TranslateService,
  ) {
    this._checkIsEdit();
    this.userForm = this._buildForm();
  }

  private _checkIsEdit() {
    if (this.data?.user) {
      this.onEdit = true;
      this._user = this.data.user;
      this.username = this._user?.username;
      this.modalTitle = this._translate.instant(`USER.USER`);
    }
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      username: new FormControl(
        { value: this.onEdit ? this._user?.username : undefined, disabled: this.onEdit },
        [
          Validators.required,
          Validators.maxLength(this.lengthValues.stringMaxLength),
          Validators.minLength(this.lengthValues.stringMinLength),
        ],
      ),
      name: new FormControl(this.onEdit ? this._user?.name : undefined),
      lastname: new FormControl(this.onEdit ? this._user?.lastname : undefined),
      birthdate: new FormControl(this.onEdit ? this._user?.birthdate : '', [Validators.required]),
      genre: new FormControl(this.onEdit ? this._user?.genre : 'M', [Validators.required]),
      height: new FormControl(this.onEdit ? this._user?.height : undefined, [
        Validators.required,
        Validators.max(this.lengthValues.heightMax),
        Validators.min(this.lengthValues.heightMin),
      ]),
      password: new FormControl(undefined, !this.onEdit ? [Validators.required] : undefined),
      controlPassword: new FormControl(
        undefined,
        !this.onEdit ? [Validators.required, this._checkPasswordValidator()] : undefined,
      ),
    });
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
        : StringHelper.ParseStringDate(this.userForm.value.birthdate),
      genre: this.userForm.value.genre,
      height: Number(this.userForm.value.height),
      password: this.onEdit ? undefined : StringHelper.Encrypt(this.userForm.value.password),
    };
  }

  save() {
    if (this.onEdit) {
      const user: IUser = {
        name: this.userForm.value.name,
        lastname: this.userForm.value.lastname,
        birthdate: this.userForm.value.birthdate,
        genre: this.userForm.value.genre,
        height: this.userForm.value.height,
      };
      this._usersService.editUser(user, this._user?.uuid ?? '').subscribe({
        next: (res) => this._dialogRef.close({ result: res }),
        error: (error) => console.error(error),
      });
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
