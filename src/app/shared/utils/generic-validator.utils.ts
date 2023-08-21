import {FormGroup} from "@angular/forms";

export class GenericValidatorUtils {
  constructor(private validationMessages: ValidationMessages) { }

  processarMensagens(container: FormGroup): { [key: string]: string } {
    let messages = {} as any;
    for (let controlKey in container.controls) {
      if (!container.controls.hasOwnProperty(controlKey)) {
        continue;
      }

      let c = container.controls[controlKey];
      if (c instanceof FormGroup) {
        let childMessages = this.processarMensagens(c);
        Object.assign(messages, childMessages);
        continue;
      }

      if (this.validationMessages[controlKey]) {
        messages[controlKey] = '';
        if ((c.dirty || c.touched) && c.errors) {
          Object.keys(c.errors).forEach(messageKey => {
            if (this.validationMessages[controlKey][messageKey]) {
              messages[controlKey] += this.validationMessages[controlKey][messageKey];
            }
          });
        }
      }
    }

    return messages;
  }
}

export interface DisplayMessage {
  [key: string]: string
}
export interface ValidationMessages {
  [key: string]: { [key: string]: string }
}
