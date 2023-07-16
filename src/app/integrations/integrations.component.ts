import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router, private paginationService: PaginationService) {
    this.paginationService.changePage(2);

    this.authService.isLoggedIn.subscribe((res) => {
      if (this.authService.user) {
        if (!this.authService.user!.is_staff) {
          this.route.navigateByUrl('/meetings');
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.user) {
      if (!this.authService.user!.is_staff) {
        this.route.navigateByUrl('/meetings');
      }
    }
  }
}
