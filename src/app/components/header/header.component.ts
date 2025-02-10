import {Component, Inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {logout} from '../../store/auth/auth.actions';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterOutlet, NgOptimizedImage, RouterLink],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(@Inject(AuthService) private authService: AuthService, @Inject(Router) private router: Router) {

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
