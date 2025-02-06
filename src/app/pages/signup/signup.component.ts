import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signup } from '../../store/auth/auth.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm;

  constructor(private store: Store, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      const user: Omit<User, 'id'> = {
        fullName: formValue.fullName!,
        address: formValue.address!,
        phone: formValue.phone!,
        email: formValue.email!,
        password: formValue.password!,
        birthdate: new Date(formValue.birthdate!)
      };
      console.log('Dispatching signup action with user:', user);
      this.store.dispatch(signup({ user }));
    }
  }
}
