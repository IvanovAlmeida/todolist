import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-list';

  constructor(private router: Router) {
  }

  isAuthModule(): boolean {
    const url = this.router.url ?? '';
    return url.startsWith('/auth');
  }
}
