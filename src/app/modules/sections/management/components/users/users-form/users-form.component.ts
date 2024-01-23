import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class UsersFormComponent implements OnChanges {
  @Input() user?: IUser;
  @Input() isTablePanel: boolean = false;
  @Output() onSaveEmitter = new EventEmitter<boolean>();

  public modalTitle: string = '';
  public userForm: FormGroup;
  public isOnEdit: boolean = false;
  public isOnAdd: boolean = true;
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
    this.userForm = this._buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = changes['user'].currentValue;
    this._init();
  }

  private _init() {
    console.log(this.user);
    if (this.isTablePanel) {
      this.isOnAdd = false;
      this.username = this.user?.username;
      this.modalTitle = this._translate.instant(`USER.USER`);
    } else {
      this.isOnAdd = true;
      console.log('isOnAdd', this.isOnAdd);
    }
    this.userForm = this._buildForm();
  }

  private _changeFormAvaliableStatus(enabled: boolean) {
    Object.keys(this.userForm.controls).forEach((f: string) => {
      if (enabled) {
        this.userForm.controls[f].enable();
      } else {
        this.userForm.controls[f].disable();
      }
    });
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
      name: new FormControl({ value: !this.isOnAdd ? this.user?.name : '', disabled: !this.isOnAdd }),
      lastname: new FormControl({
        value: !this.isOnAdd ? this.user?.lastname : '',
        disabled: !this.isOnAdd,
      }),
      birthdate: new FormControl(
        { value: !this.isOnAdd ? this.user?.birthdate : undefined, disabled: !this.isOnAdd },
        [Validators.required],
      ),
      genre: new FormControl(
        { value: !this.isOnAdd ? this.user?.genre : 'M', disabled: !this.isOnAdd },
        [Validators.required],
      ),
      height: new FormControl(
        { value: !this.isOnAdd ? this.user?.height : undefined, disabled: !this.isOnAdd },
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
      username: this.isOnAdd ? this.userForm.value.username : undefined,
      name: this.userForm.value.name,
      lastname: this.userForm.value.lastname,
      birthdate: REGEX.DB_DATE.test(this.userForm.value.birthdate)
        ? this.userForm.value.birthdate
        : StringHelper.ParseStringDate(this.userForm.value.birthdate),
      genre: this.userForm.value.genre,
      height: Number(this.userForm.value.height),
      password: !this.isOnAdd ? undefined : StringHelper.Encrypt(this.userForm.value.password),
    };
  }

  onEdit() {
    this.isOnEdit = true;
    this._changeFormAvaliableStatus(true);
  }

  onSave() {
    const user: IUser = this._parseFormValues();
    if (this.isOnAdd) {
      this._usersService.addUser(user).subscribe({
        next: (res) => this._dialogRef.close({ result: res }),
        error: (error) => console.error(error),
      });
    } else if (this.isOnEdit) {
      this._usersService.editUser(user, this.user?.uuid ?? '').subscribe({
        next: () => this.onSaveEmitter.emit(true),
        error: (error) => {
          console.error(error);
          this.isOnAdd ? this._dialogRef?.close() : this.onSaveEmitter.emit(false);
        },
      });
    }
  }

  onCancel() {
    if (this.isOnAdd) {
      this._dialogRef?.close();
    } else if (this.isOnEdit) {
      this.isOnEdit = false;
      this.userForm = this._buildForm();
      this._changeFormAvaliableStatus(false);
    }
  }
}
