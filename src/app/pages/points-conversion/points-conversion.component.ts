import {Component, OnInit} from '@angular/core';
import {PointsService} from '../../services/points/points.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-points-conversion',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './points-conversion.component.html',
  standalone: true,
  styleUrl: './points-conversion.component.scss'
})
export class PointsConversionComponent {
  selectedPoints = 100;
  message = '';

  constructor(private pointsService: PointsService,
              private authService: AuthService
              ) {}

  convertPoints() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const result = this.pointsService.convertToVoucher(currentUser.id, this.selectedPoints);

      if (result) {
        this.message = `Conversion réussie ! Vous avez obtenu un bon de ${result.amount} Dh.`;
      } else {
        this.message = 'Pas assez de points pour cette conversion.';
      }
    } else {
      this.message = 'Utilisateur non connecté.';
    }
  }
}
