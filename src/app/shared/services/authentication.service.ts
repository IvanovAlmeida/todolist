import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {AuthResponse, UserLogin, UserRegister} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  login(user: UserLogin): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    return this.httpClient.post(url, user);
  }

  register(user: UserRegister): Observable<AuthResponse> {
    const url = `${this.apiUrl}/auth/register`;
    return this.httpClient.post<AuthResponse>(url, user);
  }
}
