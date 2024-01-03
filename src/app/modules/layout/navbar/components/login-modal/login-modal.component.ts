import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'app/modules/layout/navbar/services/login.service';
import { CommonBusService } from 'app/services/common-bus.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {
  constructor(
    private readonly _loginService: LoginService,
    private readonly _commonBus: CommonBusService,
    public dialogRef: MatDialogRef<LoginModalComponent>
  ) {}
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public login() {
    this._loginService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (value) => {
          console.log('response value', value);
          if (value?.accessToken?.length < 1) {
            alert(`No autorizado`);
          }
          this.dialogRef.close({
            isLogged: value?.accessToken.length > 0,
            username: value?.user.username
          });
        },
        error: (err) => console.error(err)
      });
  }
}
