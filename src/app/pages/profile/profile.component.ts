import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const user = this.authService.getCurrentUser();
    this.profileForm = this.fb.group({
      fullName: [user?.fullName, Validators.required],
      address: [user?.address, Validators.required],
      city: [user?.city, Validators.required],
      phone: [user?.phone, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: [user?.email, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.authService.getCurrentUser(), ...this.profileForm.value };
      this.authService.setUser(updatedUser);
      this.authService.updateUserInStorage(updatedUser);
      alert('Profil mis à jour avec succès !');
    }
  }

  deleteAccount() {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      const user = this.authService.getCurrentUser();
      if (user) {
        this.authService.deleteUserFromStorage(user.id);
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
  }
}
