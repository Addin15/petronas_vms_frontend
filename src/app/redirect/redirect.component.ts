import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent {


  constructor(private activeRoute: ActivatedRoute, private authService: AuthService) {
    this.init();
  }

  async init() {
    const params = await firstValueFrom(
      this.activeRoute.queryParams
    );

    const code = params['code'];

    const res = await this.authService.redirect(code);
  }


}
