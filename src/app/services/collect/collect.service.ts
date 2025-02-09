import { Injectable } from '@angular/core';
import {CollectRequest} from '../../models/collect-request.model';
import {PointsService} from '../points/points.service';

@Injectable({ providedIn: 'root' })
export class CollectService {
  private readonly REQUESTS_KEY = 'recyclehub_requests';
  constructor(private pointsService: PointsService) {}

  getRequests(): CollectRequest[] {
    return JSON.parse(localStorage.getItem(this.REQUESTS_KEY) || '[]');
  }

  getRequestsByUser(userId: string): CollectRequest[] {
    return this.getRequests().filter(req => req.userId === userId);
  }

  addRequest(request: CollectRequest): void {
    const requests = this.getRequests();
    requests.push(request);
    localStorage.setItem(this.REQUESTS_KEY, JSON.stringify(requests));
  }

  canAddRequest(userId: string): boolean {
    const requests = this.getRequestsByUser(userId)
      .filter(req => ['en attente', 'occupée', 'en cours'].includes(req.status));
    const totalWeight = requests.reduce((sum, req) => sum + req.estimatedWeight, 0);
    return requests.length < 3 && totalWeight < 10000;
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

  validateRequest(requestId: string, realWeight: number, wasteType: string): void {
    const request = this.getRequests().find(req => req.id === requestId);

    if (request) {
      const pointsPerKg = this.getPointsPerKg(wasteType);
      const points = Math.floor(realWeight / 1000) * pointsPerKg;

      this.pointsService.addPoints(request.userId, points);

      this.updateRequest(requestId, { status: 'validée' });
    }
  }

  private getPointsPerKg(wasteType: string): number {
    switch (wasteType) {
      case 'plastique': return 2;
      case 'verre': return 1;
      case 'papier': return 1;
      case 'métal': return 5;
      default: return 0;
    }
  }
}
