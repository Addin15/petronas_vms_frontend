import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';

// Add these two
import { LottieModule } from 'ngx-lottie';
import { InvitationsModule } from './invitations/invitations.module';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth.service';
import { MeetingsModule } from './meetings/meetings.module';
import { LoadingComponent } from './loading/loading.component';

// Export this function
export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    InvitationsModule,
    DashboardModule,
    AuthModule,
    MeetingsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [AuthService, DatePipe],
})
export class AppModule { }
