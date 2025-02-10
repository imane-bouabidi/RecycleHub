import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { PointsConversionComponent } from '../points-conversion/points-conversion.component';
import { PointsComponent } from '../points/points.component';
import { CollectRequest } from '../../models/collect-request.model';
import { CollectService } from '../../services/collect/collect.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    DatePipe,
    NgIf,
    PointsConversionComponent,
    PointsComponent,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user$: Observable<User | null>;
  userRequests: CollectRequest[] = [];
  availableRequests: CollectRequest[] = [];
  acceptedRequests: CollectRequest[] = [];
  isCollector: boolean = false;

  constructor(
    private store: Store<AppState>,
    @Inject(CollectService) private collectService: CollectService,
    @Inject(AuthService) private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.store.select(state => state.auth.user);
  }

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.isCollector = currentUser.role === 'collector';

      if (this.isCollector) {
        this.availableRequests = this.collectService.getRequests().filter(req =>
          req.status === 'en attente' && req.city === currentUser.city
        );

        this.acceptedRequests = this.collectService.getRequests().filter(req =>
          req.status === 'occupée' && req.city === currentUser.city
        );
      } else {
        this.userRequests = this.collectService.getRequestsByUser(currentUser.id);
      }
    }
  }

  acceptRequest(requestId: string): void {
    this.collectService.updateRequest(requestId, { status: 'occupée' });
    this.availableRequests = this.availableRequests.filter(req => req.id !== requestId);
    this.acceptedRequests = this.collectService.getRequests().filter(req =>
      req.status === 'occupée' && req.city === this.authService.getCurrentUser()?.city
    );
  }

  rejectRequest(requestId: string): void {
    this.collectService.updateRequest(requestId, { status: 'rejetée' });
    this.availableRequests = this.availableRequests.filter(req => req.id !== requestId);
  }

  editRequest(requestId: string): void {
    this.router.navigate(['/collect-request', requestId]);
  }

  deleteRequest(requestId: string): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.collectService.deleteRequest(requestId);
    }
  }

  addRequest(){
    this.router.navigate(['/collect-request'])
  }
}
