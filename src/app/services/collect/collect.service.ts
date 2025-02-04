import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {CollectRequest} from '../../models/collect-request.model';

@Injectable({
  providedIn: 'root'
})
export class CollectService {

  constructor(private http: HttpClient) {}

  getRequests(): Observable<CollectRequest[]> {
    const mockRequests: CollectRequest[] = [
      {
        id: '1',
        userId: '1',
        wasteType: 'plastique',
        estimatedWeight: 1500,
        address: '123 Main St',
        scheduledDate: new Date('2024-02-10'),
        timeSlot: '09h00-10h00',
        status: 'en attente'
      },
      {
        id: '2',
        userId: '2',
        wasteType: 'verre',
        estimatedWeight: 2000,
        address: '456 Elm St',
        scheduledDate: new Date('2024-02-11'),
        timeSlot: '10h00-11h00',
        status: 'validée'
      }
    ];
    return of(mockRequests);
  }
}
