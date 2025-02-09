import { Component, OnInit } from '@angular/core';
import { CollectRequest } from '../../models/collect-request.model';
import {CollectService} from '../../services/collect/collect.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-request-tracking',
  templateUrl: './request-tracking.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./request-tracking.component.scss']
})
export class RequestTrackingComponent implements OnInit {
  requests: CollectRequest[] = [];

  constructor(private collectService: CollectService) {}

  ngOnInit() {
    this.requests = this.collectService.getRequestsByUser('currentUserId');
  }

  deleteRequest(requestId: string) {
    this.collectService.deleteRequest(requestId);
    this.requests = this.collectService.getRequestsByUser('currentUserId');
  }
}
