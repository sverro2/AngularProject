import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private connectionToken: string;
  private username: string;
  private authInitUrl = `http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=${location.origin}/login-succes`;

  constructor() {
    this.username = localStorage.getItem('username');
    this.connectionToken = localStorage.getItem('connectionToken');
  }

  hasConnectionToken(): boolean {
    return this.connectionToken != null;
  }

  getUserName() {
    return this.username;
  }

  getConnectionToken() {
    return this.connectionToken;
  }

  setAuthDetails(username: string, connectionToken: string) {
    this.username = username;
    this.connectionToken = connectionToken;

    //save in localStorage
    localStorage.setItem('username', this.username);
    localStorage.setItem('connectionToken', this.connectionToken);
  }

  getAuthInitUrl(){
    return this.authInitUrl;
  }

  logout(){
    this.username = null;
    this.connectionToken = null;

    localStorage.removeItem('username');
    localStorage.removeItem('connectionToken');
  }
}
