import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public login = (username: string) => {
    localStorage.setItem('__login_token', 'superCompany1234566');
    localStorage.setItem('__login_user', JSON.stringify({username}));
  }
  public lobout = () => {
    localStorage.removeItem('__login_token');
    localStorage.removeItem('__login_user');
  }
  public isUserLogin = () => {
    return localStorage.getItem('__login_token');
  }
  public userData = () => {
    return JSON.parse(localStorage.getItem('__login_user') ?? '{}');
  }

  public getUserName = () => {
    return this.isUserLogin() ? this.userData().username.split('@')?.[0] : null
  }

}
