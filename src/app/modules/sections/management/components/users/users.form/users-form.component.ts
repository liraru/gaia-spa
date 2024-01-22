import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { REGEX } from 'app/constants/regex.constant';
import { StringHelper } from 'app/helpers/string.helper';
import { IUser } from 'app/modules/sections/management/interfaces/user.interface';
import { UsersService } from 'app/modules/sections/management/services/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
})
export class UsersFormComponent {
  @Input() user?: IUser;
  @Output() onSaveEmitter = new EventEmitter<boolean>();

  public modalTitle: string = '';
  public userForm: FormGroup;
  public isOnEdit: boolean = false;
  public isOnAdd: boolean = false;
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
    @Optional() private _dialogRef: MatDialogRef<UsersFormComponent>,
    private readonly _usersService: UsersService,
    private readonly _translate: TranslateService,
  ) {
    this._checkIsEdit();
    console.log(this.user);
    this.userForm = this._buildForm();
  }

  private _checkIsEdit() {
    if (this.user) {
      this.username = this.user?.username;
      this.modalTitle = this._translate.instant(`USER.USER`);
    } else {
      this.isOnAdd = true;
    }
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      username: new FormControl(
        { value: !this.isOnAdd ? this.user?.username : undefined, disabled: !this.isOnAdd },
        [
          Validators.required,
          Validators.maxLength(this.lengthValues.stringMaxLength),
          Validators.minLength(this.lengthValues.stringMinLength),
        ],
      ),
      name: new FormControl({
        value: !this.isOnAdd ? this.user?.name : '',
        disabled: !this.isOnAdd && !this.isOnEdit,
      }),
      lastname: new FormControl({
        value: !this.isOnAdd ? this.user?.lastname : '',
        disabled: !this.isOnAdd && !this.isOnEdit,
      }),
      birthdate: new FormControl(
        { value: !this.isOnAdd ? this.user?.birthdate : '', disabled: !this.isOnAdd && !this.isOnEdit },
        [Validators.required],
      ),
      genre: new FormControl(
        { value: !this.isOnAdd ? this.user?.genre : 'M', disabled: !this.isOnAdd && !this.isOnEdit },
        [Validators.required],
      ),
      height: new FormControl(
        {
          value: !this.isOnAdd ? this.user?.height : undefined,
          disabled: !this.isOnAdd && !this.isOnEdit,
        },
        [
          Validators.required,
          Validators.max(this.lengthValues.heightMax),
          Validators.min(this.lengthValues.heightMin),
        ],
      ),
      password: new FormControl(undefined, this.isOnAdd ? [Validators.required] : undefined),
      controlPassword: new FormControl(
        undefined,
        this.isOnAdd ? [Validators.required, this._checkPasswordValidator()] : undefined,
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
      password: this.isOnEdit ? undefined : StringHelper.Encrypt(this.userForm.value.password),
    };
  }

  onEdit() {
    this.isOnEdit = true;
  }

  onSave() {
    const user: IUser = {
      name: this.userForm.value.name,
      lastname: this.userForm.value.lastname,
      birthdate: this.userForm.value.birthdate,
      genre: this.userForm.value.genre,
      height: this.userForm.value.height,
    };
    this._usersService.editUser(user, this.user?.uuid ?? '').subscribe({
      next: (res) => (this.isOnAdd ? this._dialogRef?.close(res) : this.onSaveEmitter.emit(true)),
      error: (error) => {
        console.error(error);
        this.isOnAdd ? this._dialogRef?.close() : this.onSaveEmitter.emit(false);
      },
    });
  }

  onCancel() {
    if (this.isOnAdd) {
      console.log('isOnAdd');
      this._dialogRef?.close();
    } else if (this.isOnEdit) {
      this.isOnEdit = false;
      this._buildForm();
    }
  }
}
