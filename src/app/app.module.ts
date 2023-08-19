import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLayoutComponent } from './shared/layouts/auth/auth-layout.component';
import { AppLayoutComponent } from './shared/layouts/app-layout/app-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
