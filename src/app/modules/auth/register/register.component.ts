import {AfterViewInit, Component, ElementRef, OnInit, ViewChildren, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "src/app/shared/services/authentication.service";
import {AuthResponse, UserRegister} from "src/app/shared/models/user.model";
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {matchValidator} from "src/app/shared/functions/match-validator";
import {SessionStorageUtils} from "src/app/shared/utils/session-storage.utils";
import {Router} from "@angular/router";
import {FormBaseComponentComponent} from "src/app/shared/components/form-base-component/form-base-component.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent extends FormBaseComponentComponent implements AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];

  loading = false;
  success = false;
  errors: string[] = [];

  registerForm: FormGroup;
  userRegister: UserRegister;

  private readonly sessionStorage = new SessionStorageUtils();

  constructor(private authService: AuthenticationService, private router: Router,
              private fb: FormBuilder) {
    super();

    this.userRegister = {} as UserRegister;

    this.validationMessages = {
      name: {
        required: 'Informe um nome',
        minlength: 'Nome deve conter no minimo 4 caracteres.'
      },
      email: {
        required: 'Informe um email',
        email: 'Informe um email valido.'
      },
      password: {
        required: 'Informe uma senha',
        minlength: 'Senha deve conter ao menos 6 caracteres.'
      },
      passwordConfirm: {
        required: 'A confirmacao da senha e obrigatorio.',
        minlength: 'A confirmacao da senha deve conter ao menos 6 caracteres.',
        matching: 'As senhas nao conferem.'
      }
    };

    this.registerForm = this.fb.group({
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

    super.configureValidationMessagesBase(this.validationMessages);
  }

  ngAfterViewInit() {
    super.configureFormValidationBase(this.formInputElements, this.registerForm);
  }

  register(): void {
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

  getInputClassConfig(inputName: string): any {
    return {
      'is-invalid': this.displayMessage[inputName],
      'is-valid': this.displayMessage[inputName]
    };
  }
}
