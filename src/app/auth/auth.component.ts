import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  login_email: string = '';
  login_password: string = '';


  register_email: string = '';
  register_name: string = '';
  register_phone: string = '';
  register_password: string = '';

  constructor(private authService: AuthService, private route: Router) { }

  async login() {
    const res = await this.authService.login(this.login_email, this.login_password);

    if (res == null) {
      this.route.navigateByUrl('/dashboard');
    }
  }


  async register() {
    const res = await this.authService.register(this.register_email, this.register_name, this.register_phone, this.register_password);

    if (res == null) {
      this.route.navigateByUrl('/dashboard');
    }
  }
}
