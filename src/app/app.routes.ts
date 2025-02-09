import { Routes } from '@angular/router';
import {PointsComponent} from './pages/points/points.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CollectRequestComponent} from './pages/collect-request/collect-request.component';
import {RequestTrackingComponent} from './pages/request-tracking/request-tracking.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {CollectorComponent} from './pages/collector/collector.component';
import {CollectorCollectsComponent} from './pages/collector-collects/collector-collects.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'collect-request', component: CollectRequestComponent },
  { path: 'request-tracking', component: RequestTrackingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'collector', component: CollectorComponent },
  { path: 'collector-collects', component: CollectorCollectsComponent },
  { path: 'points', component: PointsComponent },
  { path: '**', redirectTo: '/login' }
];
