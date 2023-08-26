import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLayoutComponent } from './shared/layouts/auth/auth-layout.component';
import { AppLayoutComponent } from './shared/layouts/app-layout/app-layout.component';
import {SidebarComponent} from "./shared/layouts/app-layout/subcomponents/sidebar/sidebar.component";
import {AuthenticationService} from "./shared/services/authentication.service";
import {CommonModule, registerLocaleData} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import localePt from '@angular/common/locales/pt';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import {defineLocale} from "ngx-bootstrap/chronos";
import {ToastrModule} from "ngx-toastr";
import {ErrorInterceptor} from "./shared/interceptors/error.interceptor";
import {LoggingInterceptor} from "./shared/interceptors/logging.interceptor";

registerLocaleData(localePt);
defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    AppLayoutComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    {provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
