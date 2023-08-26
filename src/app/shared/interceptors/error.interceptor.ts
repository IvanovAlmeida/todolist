import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {SessionStorageUtils} from "../utils/session-storage.utils";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private tastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next
      .handle(request)
      .pipe(
        tap({
          error: (err: HttpErrorResponse) => {
            if (err.status === 500) {
              this.showError('Ops, ocorreu um erro ao tentar processar sua requisição!', 'Tente novamente ou contate o administrador.');
            }

            if (err.status === 401) {
              this.showError('Sua sessão expirou!', 'Realize o login e tente novamente.');

              (new SessionStorageUtils()).clear();
              this.router.navigateByUrl('/auth/login');
            }
          }
        })
      )
  }

  private showError(title: string, text: string): void {
    const toatrOptions = {
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 4000,
      toastClass: 'ngx-toastr w-100'
    } as Partial<any>;

    this.tastr.error(text, title, toatrOptions)
  }
}
