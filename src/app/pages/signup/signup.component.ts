import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl} from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,CommonModule,
    NgOptimizedImage],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  name = new FormControl('');
}
