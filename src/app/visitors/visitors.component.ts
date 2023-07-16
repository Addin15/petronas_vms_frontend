import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router, private paginationService: PaginationService) {
    this.paginationService.changePage(1);

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
