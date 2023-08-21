import {environment} from "../../../environments/environment";
import {AuthResponse} from "../models/user.model";

export class SessionStorageUtils {

  public isAuthenticated(): boolean {
    const key = this.getKey('user');
    const user = sessionStorage.getItem(key);

    return user !== null && user !== '';
  }

  public setUserInfos(auth: AuthResponse): void {
    this.setItem('user', auth.user);
    this.setItem('accessToken', auth.accessToken);
    this.setItem('expiresIn', auth.expiresIn);
  }

  public getToken(): string|null {
    return this.getItemAsString('accessToken');
  }

  public clear(): void {
    sessionStorage.clear();
  }

  private getItemString(key: string): string|null {
    return sessionStorage.getItem(this.getKey(key));
  }

  public getItem<T>(key: string): T|null {
    const value = this.getItemString(key);
    if (value === null || value === '') {
      return null;
    }

    return JSON.parse(value) as T;
  }

  private getItemAsString(key: string): string|null {
    return sessionStorage.getItem(this.getKey(key));
  }

  private setItem(key: string, value: any): void {
    if(typeof value === 'object') {
      value = JSON.stringify(value);
    }

    sessionStorage.setItem(this.getKey(key), value);
  }

  private getKey(key: string): string {
    const prefix = environment.sessionPrefix;
    if (prefix && prefix !== '') {
      return `${prefix}.${key}`;
    }

    return key;
  }
}
