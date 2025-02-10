import { Injectable } from '@angular/core';
import { User } from '../../models/User.model';

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

  updateUserInStorage(updatedUser: User): void {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === updatedUser.id);

    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    } else {
      const collectors = this.getCollectors();
      const collectorIndex = collectors.findIndex(c => c.id === updatedUser.id);

      if (collectorIndex !== -1) {
        collectors[collectorIndex] = updatedUser;
        localStorage.setItem(this.COLLECTORS_KEY, JSON.stringify(collectors));
      }
    }
  }

  deleteUserFromStorage(userId: string): void {
    const users = this.getUsers();
    const updatedUsers = users.filter(u => u.id !== userId);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));

    const collectors = this.getCollectors();
    const updatedCollectors = collectors.filter(c => c.id !== userId);
    localStorage.setItem(this.COLLECTORS_KEY, JSON.stringify(updatedCollectors));
  }

  getCollectors(): User[] {
    const collectorsJson = localStorage.getItem(this.COLLECTORS_KEY);
    return collectorsJson ? JSON.parse(collectorsJson) : [];
  }
}
