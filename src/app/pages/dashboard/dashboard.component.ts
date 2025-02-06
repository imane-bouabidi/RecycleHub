import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {loadRequests} from '../../store/collect/collect.actions';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadRequests());
  }

  onLoadRequests() {
    this.store.dispatch(loadRequests());
  }
}
