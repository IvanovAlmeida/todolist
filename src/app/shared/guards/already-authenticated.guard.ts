import {CanActivateFn, Router} from '@angular/router';
import {SessionStorageUtils} from "src/app/shared/utils/session-storage.utils";
import {inject} from "@angular/core";

export const alreadyAuthenticatedGuard: CanActivateFn = (route, state) => {
  const sessionStorageUtil = new SessionStorageUtils();
  if(!sessionStorageUtil.isAuthenticated()) {
    return true;
  }

  return inject(Router).parseUrl('/');
};
