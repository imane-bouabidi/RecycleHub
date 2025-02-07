import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {loadRequests} from '../../store/collect/collect.actions';
import {AppState} from '../../store/app.state';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    DatePipe,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  user$: Observable<User | null>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(state => state.auth.user);
  }

  ngOnInit() {
    this.store.dispatch(loadRequests());
  }

  onLoadRequests() {
    this.store.dispatch(loadRequests());
  }
}
