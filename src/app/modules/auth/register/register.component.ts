import {Component, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {AuthResponse, UserRegister} from "../../../shared/models/user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {matchValidator} from "../../../shared/functions/match-validator";
import {SessionStorageUtils} from "../../../shared/utils/session-storage.utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

  loading = false;
  success = false;
  errors: string[] = [];

  registerForm: FormGroup;
  userRegister: UserRegister;

  private readonly sessionStorage = new SessionStorageUtils();

  constructor(private authService: AuthenticationService, private router: Router) {
    this.userRegister = {} as UserRegister;

    this.registerForm = new FormGroup({
      name: new FormControl(this.userRegister.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl(this.userRegister.email, [
        Validators.required, Validators.email
      ]),
      password: new FormControl(this.userRegister.password, [
        Validators.required, Validators.minLength(6), matchValidator('passwordConfirm', true)
      ]),
      passwordConfirm: new FormControl(this.userRegister.passwordConfirm, [
        Validators.required, Validators.minLength(6), matchValidator('password')
      ])
    });
  }

  register() {
    this.errors = [];
    this.success = false;
    this.loading = true;

    const register = {
      name: this.registerForm.controls['name'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      passwordConfirm: this.registerForm.controls['passwordConfirm'].value,
    } as UserRegister;

    this.authService.register(register).subscribe({
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
    return this.registerForm.valid;
  }

  hasErrors(): boolean {
    return this.errors.length !== 0;
  }

  inputIsInvalid(inputName: string): boolean {
    console.log(this.registerForm)
    return this.registerForm.controls[inputName].invalid &&
      (this.registerForm.controls[inputName].dirty || this.registerForm.controls[inputName].touched);
  }

  inputIsValid(inputName: string): boolean {
    return this.registerForm.controls[inputName].valid &&
      (this.registerForm.controls[inputName].dirty || this.registerForm.controls[inputName].touched);
  }

  inputHasError(inputName: string, error: string): boolean {
    return this.registerForm.controls[inputName].errors?.[error];
  }

  getInputClassConfig(inputName: string): any {
    return {
      'is-invalid': this.inputIsInvalid(inputName),
      'is-valid': this.inputIsValid(inputName)
    };
  }
}
