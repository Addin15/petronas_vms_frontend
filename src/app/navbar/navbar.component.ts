import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() selectedPage: number | undefined;

  constructor(public authService: AuthService, public route: Router) {
  }

  logout() {
    this.authService.logout()
    this.route.navigateByUrl('/auth');
  }
}
