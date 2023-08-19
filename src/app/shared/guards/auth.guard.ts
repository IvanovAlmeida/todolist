import {CanActivateFn, Router} from '@angular/router';
import {environment} from "../../../environments/environment";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {

  if(environment.authenticated) {
    return true;
  }

  return inject(Router).parseUrl('auth');
};


