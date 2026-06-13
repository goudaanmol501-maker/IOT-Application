import { Injectable } from '@angular/core';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})

export class Auth {
  private storageKey = 'iiot_users';
  registerUser(email: string, password: string): boolean {
    const existing = this.getUser();
    if(existing && existing.email === email){
      return false;
    }

    const user: User = {email, password};
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    return true;
  }

  loginUser(email: string, password: string): boolean {
    const user = this.getUser();
    if(!user){
      return false;
    }
    return user.email === email && user.password === password;
  }

  getUser(): User | null {
    const data = localStorage.getItem(this.storageKey);
    if(!data) return null;
    return JSON.parse(data) as User;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('iiot_logged_in')==='true';
  }

  setLoggedIn(){
    localStorage.setItem('iiot_logged_in', 'true');
  }
  logout(){
    localStorage.removeItem('iiot_logged_in');
  }

  clearAll(){
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('iiot_logged_in');
  }
}
