import {Component, Injectable, Type} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private _state: DrawerState = DrawerState.Closed;
  private _openSubject: ReplaySubject<DrawerOptions> = new ReplaySubject<DrawerOptions>(undefined);
  private _updateSubject: ReplaySubject<DrawerOptions> = new ReplaySubject<DrawerOptions>(undefined);
  private _closeSubject: ReplaySubject<void> = new ReplaySubject<void>(undefined);

  get state(): DrawerState {
    return this._state;
  }

  get onOpen(): Observable<any> {
    return this._openSubject.asObservable();
  }

  get onUpdate(): Observable<any> {
    return this._updateSubject.asObservable();
  }

  get onClose(): Observable<any> {
    return this._closeSubject.asObservable();
  }

  public open(component: Type<any>, data: any): void {
    if (this._state === DrawerState.Open) {
      this.updateContent({
        component,
        data
      });
      return;
    }

    this._state = DrawerState.Open;
    this._openSubject.next({
      component,
      data
    });
  }

  public close(): void {
    this._state = DrawerState.Closed;
    this._closeSubject.next();
  }

  private updateContent(data: any): void {
    this._updateSubject.next(data);
  }
}

export enum DrawerState {
  Open,
  Closed
}

export interface DrawerOptions {
  component: Type<any>;
  data: any;
}
