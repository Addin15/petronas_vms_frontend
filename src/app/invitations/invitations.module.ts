import { NgModule } from '@angular/core';
import { InvitationsComponent } from './invitations.component';

import { LottieModule } from 'ngx-lottie';
import { InvitationsService } from './invitations.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

// Export this function
export function playerFactory(): any {
  return import('lottie-web');
}


@NgModule({
  declarations: [
    InvitationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    QRCodeModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    InvitationsService
  ]
})
export class InvitationsModule { }
