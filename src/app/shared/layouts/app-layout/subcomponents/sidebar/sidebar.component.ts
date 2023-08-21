import { Component } from '@angular/core';
import {SessionStorageUtils} from "../../../../utils/session-storage.utils";
import {User} from "../../../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  private readonly sessionStorage: SessionStorageUtils = new SessionStorageUtils();

  constructor(private router: Router) {
  }

  get username(): string {
    return this.sessionStorage.getItem<User>('user')?.name ?? 'Not logged';
  }

  logout(): void {
    this.sessionStorage.clear();
    this.router.navigateByUrl('/auth');
  }
}
