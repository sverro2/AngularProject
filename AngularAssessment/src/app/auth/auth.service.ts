import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public connectionToken: string;
  public username: string;
  private authInitUrl = 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=localhost:4200/login-succes'

  constructor() { }

  hasConnectionToken(): boolean {
    return this.connectionToken != null;
  }

  getAuthInitUrl(){
    return this.authInitUrl;
  }

  logout(){
    this.username = null;
    this.connectionToken = null;
  }
}
