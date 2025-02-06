import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    const mockUser: User = {
      id: '1',
      fullName: 'John',
      address: '123 Main St',
      phone: '1234567890',
      email: email,
      password: password,
      birthdate: new Date('1990-01-01'),
    };
    return of(mockUser);
  }

  signup(userData: Omit<User, 'id'>): Observable<User> {
    const mockUser: User = {
      id: '2',
      ...userData,
      birthdate: new Date(userData.birthdate),
    };
    console.log('AuthService: Mock user created:', mockUser);
    return of(mockUser);
  }
}
