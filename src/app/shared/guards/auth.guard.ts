import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SessionStorageUtils} from "../utils/session-storage.utils";

export const authGuard: CanActivateFn = (route, state) => {
  const sessionStorageUtil = new SessionStorageUtils();
  if(sessionStorageUtil.isAuthenticated()) {
    return true;
  }

  return inject(Router).parseUrl('auth');
};


