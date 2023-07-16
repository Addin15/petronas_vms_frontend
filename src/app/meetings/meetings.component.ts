import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  constructor(public authService: AuthService, private route: Router) {
    this.authService.isLoggedIn.subscribe((res) => {
      if (this.authService.user) {
        if (this.authService.user!.is_staff) {
          console.log('staff')
          this.route.navigateByUrl('/dashboard');
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.user) {
      if (this.authService.user!.is_staff) {
        console.log('staff')
        this.route.navigateByUrl('/dashboard');
      }
    }
  }

  async authorize() {
    await this.authService.authorizeGoogle();
    this.redirectTo('/meetings')
  }

  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }
}
