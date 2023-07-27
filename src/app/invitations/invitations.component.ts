import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { firstValueFrom } from 'rxjs';
import { Invitation } from '../interfaces/invitation.interface';
import { DatePipe } from '@angular/common';
import { InvitationsService } from './invitations.service';
import { apiHost } from '../configs';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  waitingLottie: AnimationOptions = {
    path: '/assets/lotties/waiting-line.json'
  };

  checkmarkLottie: AnimationOptions = {
    path: '/assets/lotties/checkmark.json'
  };

  nric!: string;
  name!: string;
  isLoading: boolean;
  isPreRegistering: boolean;
  invitation: Invitation | undefined;

  constructor(private activeRoute: ActivatedRoute, private invitationService: InvitationsService) {
    this.isPreRegistering = false;
    this.isLoading = true;
    this.init();
  }

  ngOnInit(): void { }

  async init() {
    const params = await firstValueFrom(this.activeRoute.params);

    const id = params['id']

    try {
      const response = await this.invitationService.getInvitation(id);

      if (response.status == 200) {
        const data: any = response.body;
        this.invitation = data['invitation'];
      }
    } catch (e) {

    } finally {

      this.isLoading = false;
    }
  }

  formatDate(date: Date) {
    var datePipe = new DatePipe('en-MY');
    return datePipe.transform(date, 'medium');
  }

  async preRegister() {
    this.isPreRegistering = true;

    if (this.nric != null && this.nric != '' && this.name != null && this.name != '') {
      const params = await firstValueFrom(this.activeRoute.params);

      const id = params['id']

      const response = await this.invitationService.preRegister(id, this.nric, this.name);

      if (response.status == 200) {
        const data: any = response.body;
        this.invitation = data['invitation'];
        this.isLoading = false;
      }
    }

    this.isPreRegistering = false;
  }

  getImage(id: string) {
    return `${apiHost}/api/invitations/${id}/qr/`;
  }

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void { }
}
