import { Injectable } from '@angular/core';
import {CollectRequest} from '../../models/collect-request.model';

@Injectable({ providedIn: 'root' })
export class CollectService {
  private readonly REQUESTS_KEY = 'recyclehub_requests';

  getRequests(): CollectRequest[] {
    return JSON.parse(localStorage.getItem(this.REQUESTS_KEY) || '[]');
  }

  addRequest(request: CollectRequest): void {
    const requests = this.getRequests();
    requests.push(request);
    localStorage.setItem(this.REQUESTS_KEY, JSON.stringify(requests));
  }

  updateRequest(requestId: string, updates: Partial<CollectRequest>): void {
    const requests = this.getRequests();
    const index = requests.findIndex(req => req.id === requestId);
    if (index !== -1) {
      requests[index] = { ...requests[index], ...updates };
      localStorage.setItem(this.REQUESTS_KEY, JSON.stringify(requests));
    }
  }

  deleteRequest(requestId: string): void {
    const requests = this.getRequests().filter(req => req.id !== requestId);
    localStorage.setItem(this.REQUESTS_KEY, JSON.stringify(requests));
  }
}
