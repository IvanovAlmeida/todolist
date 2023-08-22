import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponse, UserLogin} from "src/app/shared/models/user.model";
import {AuthenticationService} from "src/app/shared/services/authentication.service";
import {Router} from "@angular/router";
import {SessionStorageUtils} from "src/app/shared/utils/session-storage.utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {
  loading = false;
  success = false;
  errors: string[] = [];

  loginForm: FormGroup;
  userLogin: UserLogin = {} as UserLogin;

  private readonly sessionStorage = new SessionStorageUtils();

  constructor(private authService: AuthenticationService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(this.userLogin.email, [
        Validators.required, Validators.email
      ]),
      password: new FormControl(this.userLogin.password, [
        Validators.required, Validators.minLength(6)
      ])
    });
  }

  login(): void {
    this.errors = [];
    this.success = false;
    this.loading = true;

    const login = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    } as UserLogin;

    this.authService.login(login).subscribe({
      next: (data: AuthResponse) => {
        this.sessionStorage.setUserInfos(data);
        this.router.navigateByUrl('/').then(p => {
          console.log('navegado')
        });
      },
      error: (err) => {
        this.loading = false;
        this.errors = err.error.erros;
      }, complete: () => {
        this.loading = false;
      }
    })
  }

  isValid(): boolean {
    return this.loginForm.valid;
  }

  hasErrors(): boolean {
    return this.errors.length !== 0;
  }

  inputIsInvalid(inputName: string): boolean {
    return this.loginForm.controls[inputName].invalid &&
      (this.loginForm.controls[inputName].dirty || this.loginForm.controls[inputName].touched);
  }

  inputIsValid(inputName: string): boolean {
    return this.loginForm.controls[inputName].valid &&
      (this.loginForm.controls[inputName].dirty || this.loginForm.controls[inputName].touched);
  }

  inputHasError(inputName: string, error: string): boolean {
    return this.loginForm.controls[inputName].errors?.[error];
  }

  getInputClassConfig(inputName: string): any {
    return {
      'is-invalid': this.inputIsInvalid(inputName),
      'is-valid': this.inputIsValid(inputName)
    };
  }
}
