import { Routes } from '@angular/router';
import {PointsComponent} from './pages/points/points.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CollectRequestComponent} from './pages/collect-request/collect-request.component';
import {RequestTrackingComponent} from './pages/request-tracking/request-tracking.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';
import {CollectorGuard} from './guards/collector.guard';
import {ParticularGuard} from './guards/particular.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'collect-request', component: CollectRequestComponent, canActivate: [AuthGuard, ParticularGuard] },
  { path: 'request-tracking', component: RequestTrackingComponent, canActivate: [AuthGuard, CollectorGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'collect-request/:id',
    component: CollectRequestComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
