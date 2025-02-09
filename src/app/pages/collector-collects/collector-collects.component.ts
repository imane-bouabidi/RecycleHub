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

  constructor(
    private collectService: CollectService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.requests = this.collectService.getRequests().filter(req =>
        req.status === 'en attente' && req.city === currentUser.city
      );
    }
    console.log('Demandes filtrées :', this.requests);
  }

  acceptRequest(requestId: string): void {
    this.collectService.updateRequest(requestId, { status: 'occupée' });
    this.requests = this.requests.filter(req => req.id !== requestId);
  }

  rejectRequest(requestId: string): void {
    this.collectService.updateRequest(requestId, { status: 'rejetée' });
    this.requests = this.requests.filter(req => req.id !== requestId);
  }

}
