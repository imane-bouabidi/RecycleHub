import { Component } from '@angular/core';
import {CollectRequest} from '../../models/collect-request.model';
import {CollectService} from '../../services/collect/collect.service';
import {AuthService} from '../../services/auth/auth.service';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-collector-collects',
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './collector-collects.component.html',
  standalone: true,
  styleUrl: './collector-collects.component.scss'
})
export class CollectorCollectsComponent {
  requests: CollectRequest[] = [];
  pendingRequests: CollectRequest[] = [];
  acceptedRequests: CollectRequest[] = [];

  constructor(
    private collectService: CollectService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.pendingRequests = this.collectService.getRequests().filter(req =>
        req.status === 'en attente' && req.city === currentUser.city
      );

      this.acceptedRequests = this.collectService.getRequests().filter(req =>
        req.status === 'occupée' && req.city === currentUser.city
      );
    }
    console.log('Demandes filtrées :', this.pendingRequests);
  }

  acceptRequest(requestId: string): void {
    this.collectService.updateRequest(requestId, { status: 'occupée' });
    this.pendingRequests = this.pendingRequests.filter(req => req.id !== requestId);
    this.acceptedRequests = this.collectService.getRequests().filter(req =>
      req.status === 'occupée' && req.city === this.authService.getCurrentUser()?.city
    );
  }

  rejectRequest(requestId: string): void {
    this.collectService.updateRequest(requestId, { status: 'rejetée' });
    this.pendingRequests = this.pendingRequests.filter(req => req.id !== requestId);
  }

}
