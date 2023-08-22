import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLayoutComponent } from './shared/layouts/auth/auth-layout.component';
import { AppLayoutComponent } from './shared/layouts/app-layout/app-layout.component';
import {SidebarComponent} from "./shared/layouts/app-layout/subcomponents/sidebar/sidebar.component";
import {AuthenticationService} from "./shared/services/authentication.service";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";

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
    FontAwesomeModule
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
