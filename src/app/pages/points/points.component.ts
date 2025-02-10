import {Component, Input, OnInit} from '@angular/core';
import {PointsService} from '../../services/points/points.service';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/User.model';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-points',
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './points.component.html',
  standalone: true,
  styleUrl: './points.component.scss'
})
export class PointsComponent implements OnInit {
  points: any;
  currentUser: User | null | undefined;
  constructor(private pointsService: PointsService,
              private authService: AuthService) {}

  ngOnInit() {
     this.currentUser = this.authService.getCurrentUser();
    this.loadPoints();
  }

  loadPoints() {
    if (this.currentUser) {
      this.points = this.pointsService.getUserPoints(this.currentUser.id);
    }
  }

  refreshPoints() {
    this.loadPoints();
  }
}
