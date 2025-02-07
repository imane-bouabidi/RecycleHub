import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'recyclehub_users';
  private readonly COLLECTORS_KEY = 'recyclehub_collectors';
  private readonly CURRENT_USER_KEY = 'recyclehub_current_user';

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  login(email: string, password: string): User | null {
    const collectorsJson = localStorage.getItem(this.COLLECTORS_KEY);
    const collectors: User[] = collectorsJson ? JSON.parse(collectorsJson) : [];
    const collector = collectors.find(u => u.email === email && u.password === password);

    if (collector) return collector;

    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    return user || null;
  }

  registerUser(userData: Omit<User, 'id'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: this.generateId()
    };
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return newUser;
  }

  getUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  setUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
}
