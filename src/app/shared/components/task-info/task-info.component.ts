import {Component, OnDestroy} from '@angular/core';
import {DrawerService} from "../../layouts/app-layout/subcomponents/drawer/drawer.service";

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent {
  data: any;

  get jsonData(): string {
    return JSON.stringify(this.data);
  }

  constructor(private drawerService: DrawerService) {
  }

  close(): void {
    this.drawerService.close();
  }
}
