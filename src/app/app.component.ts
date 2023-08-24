import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {BsLocaleService} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private localeService: BsLocaleService) {
    this.localeService.use('pt-br');
  }

  isAuthModule(): boolean {
    const url = this.router.url ?? '';
    return url.startsWith('/auth');
  }
}
