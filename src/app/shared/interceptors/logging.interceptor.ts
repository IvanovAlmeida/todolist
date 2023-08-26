import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {finalize, Observable, tap} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!environment.logging) {
      return next.handle(request);
    }

    const started = Date.now();
    let ok: string;
    let statusCode: number;

    return next.handle(request)
      .pipe(
        tap({
          next: (event) => {
            ok = '';
            if (event instanceof HttpResponse) {
              ok = 'succeeded';
              statusCode = event.status;
            }
          },
          error: (error: HttpResponse<any>) => {
            ok = 'failed';
            statusCode = error.status;
          }
        }),
        finalize(() => {
          const elapsed = Date.now() - started;

          const msg = `%cRequest Logging %c${request.method.trim()} ${request.urlWithParams} ${ok} with status ${statusCode} in ${elapsed} ms.`;
          const infoStyle = ok === 'failed' ? 'color: red' : 'color: green';

          console.info(msg, 'color: blue; margin-bottom: 8px;', infoStyle);
        })
      );
  }
}
