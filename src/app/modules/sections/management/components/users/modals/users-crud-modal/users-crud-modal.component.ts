import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-crud-modal',
  templateUrl: './users-crud-modal.component.html',
  styleUrl: './users-crud-modal.component.scss'
})
export class UsersCrudModalComponent {
  public userForm: FormGroup = new FormGroup(
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

  constructor() {}

  private _checkPasswordValidator(): Validators {
    const pwdControl = this.userForm.controls[`password`];
    const pwdControlMatch = this.userForm.controls[`controlPassword`];
    return { notmatched: pwdControl.value !== pwdControlMatch.value ? true : false };
  }

  save() {}
}
