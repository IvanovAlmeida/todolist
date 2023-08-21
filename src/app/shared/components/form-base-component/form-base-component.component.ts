import {DisplayMessage, GenericValidatorUtils, ValidationMessages} from "src/app/shared/utils/generic-validator.utils";
import {ElementRef} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {fromEvent, merge, Observable} from "rxjs";

export abstract class FormBaseComponentComponent {
  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidatorUtils = {} as GenericValidatorUtils;
  validationMessages: ValidationMessages = {} as ValidationMessages;

  unsavedChanges: boolean = false;

  protected configureValidationMessagesBase(validationMessages: ValidationMessages): void {
    this.genericValidator = new GenericValidatorUtils(validationMessages);
  }

  protected configureFormValidationBase(formInputElements: ElementRef[], formGroup: FormGroup): void {
    let controlBlurs: Observable<any>[] = formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario(formGroup)
    });
  }

  protected validarFormulario(formGroup: FormGroup) {
    this.displayMessage = this.genericValidator.processarMensagens(formGroup);
    this.unsavedChanges = true;
  }
}
