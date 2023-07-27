import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { MeetingsService } from './meetings.service';
import { InvitationMeeting } from '../interfaces/invitation-meeting.interface';
import { DatePipe } from '@angular/common';
import { Invitation } from '../interfaces/invitation.interface';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  step: number = 0;

  is_getting_data: boolean = true;
  meetings: InvitationMeeting[] = [];

  // Form Data
  summary: string = '';
  purpose: string = 'meeting';
  start_date?: Date;
  end_date?: Date;
  location?: string;
  description?: string;
  visitors_email: string[] = [];

  email?: string;

  addedMeeting?: InvitationMeeting;


  checkmarkLottie: AnimationOptions = {
    path: '/assets/lotties/checkmark.json'
  };

  constructor(public authService: AuthService, private route: Router, private meetingService: MeetingsService) {
    this.authService.isLoggedIn.subscribe((res) => {
      if (this.authService.user) {
        if (this.authService.user!.is_staff) {
          console.log('staff')
          this.route.navigateByUrl('/dashboard');
        }
      }
    });
    this.get_meetings_data();
  }

  ngOnInit(): void {
    if (this.authService.user) {
      if (this.authService.user!.is_staff) {
        console.log('staff')
        this.route.navigateByUrl('/dashboard');
      }
    }
  }

  async get_meetings_data() {
    const response = await this.meetingService.get_all_meetings();

    if (response.ok) {
      this.is_getting_data = false;
      this.meetings = response.body;
      this.meetings.sort((a, b) => {
        if (a.start_date > b.start_date) {
          return 1;
        } else return 0;
      });
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

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void { }

  is_pre_registered(invitations: Invitation[]): boolean {

    for (let invitation of invitations) {
      if (invitation.is_preregistered) continue;
      return false;
    }
    return true;
  }

  onStartDateSelected(event: any) {
    console.log(event);
  }

  get_visitors_name(invitations: Invitation[]) {
    return invitations.map((m) => m.visitor_name == null ? m.visitor_email : m.visitor_name);
  }


  get_time_diff(dt1: Date, dt2: Date) {
    var datePipe = new DatePipe('en-MY');
    var date1 = datePipe.transform(dt1, 'short');
    var date2 = datePipe.transform(dt2, 'short');

    var diff = (new Date(date2!).getTime() - new Date(date1!).getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  is_meeting_ended(meeting: InvitationMeeting): boolean {
    const now = new Date();

    var datePipe = new DatePipe('en-MY');
    var date = datePipe.transform(meeting.end_date, 'short');

    if (new Date(date!) < now) return true;

    return false;
  }

  today() {
    return new Date().getDate();
  }

  month() {
    return ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"][new Date().getMonth()];
  }

  addEmail() {
    if (this.email?.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.visitors_email.push(this.email);
      this.email = undefined;
    }
  }

  async addMeeting() {
    const response = await this.meetingService.add_meeting(
      this.summary,
      this.description,
      this.visitors_email,
      this.start_date,
      this.end_date,
      this.purpose,
      this.location,
    );

    if (response.ok) {
      this.addedMeeting = response.body;
      this.meetings.push(this.addedMeeting!);
      this.meetings.sort((a, b) => {
        if (a.start_date > b.start_date) {
          return 1;
        } else return 0;
      });
      this.step = 3;
    }
  }

  emptyForm() {
    this.summary = '';
    this.start_date = undefined;
    this.end_date = undefined;
    this.location = undefined;
    this.description = undefined;
    this.visitors_email = [];
    this.addedMeeting = undefined;
  }
}
