import {Component} from '@angular/core';
import {DrawerService, DrawerState} from "./subcomponents/drawer/drawer.service";

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {
  get contentContainerClass(): string {
    return this.drawerService.state === DrawerState.Open
      ? 'col-sm-8 col-md-9 col-lg-9'
      : 'col-sm-12 col-md-12 col-lg-12';
  }

  get drawerContainerClass(): string {
    return this.drawerService.state === DrawerState.Open
      ? 'col-sm-4 col-md-3 col-lg-3'
      : 'd-none';
  }

  constructor(private drawerService: DrawerService) {
  }
}
