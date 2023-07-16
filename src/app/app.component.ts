import { Component } from '@angular/core';
import { PaginationService } from './pagination.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'petronas_vms_frontend';

  selectedPage: number | undefined;

  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, private route: Router, private paginationService: PaginationService) {
    this.paginationService.currentPage.subscribe((index) => {
      this.selectedPage = index;
    });

    this.authService.isLoggedIn.subscribe((res) => {
      this.isLoggedIn = res;
    })

  }


}
