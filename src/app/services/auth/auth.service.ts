import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.recyclehub.com/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    const mockUser: User = {
      id: '1',
      fullName: 'John',
      address: '123 Main St',
      phone: '123-456-7890',
      email: email,
      password: "jznodke",
      birthdate: new Date('1990-01-01'),
    };
    return of(mockUser);
  }
}
