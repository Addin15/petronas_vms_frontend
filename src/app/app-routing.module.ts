import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationsComponent } from './invitations/invitations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { MeetingsComponent } from './meetings/meetings.component';

const routes: Routes = [
  { path: 'invitations/:id', component: InvitationsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent, canActivate: [NoAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'visitors', component: VisitorsComponent, canActivate: [AuthGuard] },
  { path: 'integrations', component: IntegrationsComponent, canActivate: [AuthGuard] },
  { path: 'meetings', component: MeetingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
