import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionStorageUtils} from "src/app/shared/utils/session-storage.utils";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly sessionStorage: SessionStorageUtils = new SessionStorageUtils();

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.sessionStorage.isAuthenticated()) {
      const token = this.sessionStorage.getToken();
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request);
  }
}
