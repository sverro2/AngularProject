import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../auth/auth.service';

const baseUrl: string = 'http://mahjongmayhem.herokuapp.com';

@Injectable()
export class BackendService {
  constructor(private auth: AuthService, private http: Http) { }

  createAuthHeader(): Headers {
    const authHeader = new Headers();
    authHeader.append('x-username', this.auth.getUserName());
    authHeader.append('x-token', this.auth.getConnectionToken());
    return authHeader;
  }

  putRequest(path: string, message:object){
    return this.http.put(baseUrl + path, message, {headers: this.createAuthHeader()});
  }

  requestPost(path: string, message:object){
    return this.http.post(baseUrl + path, message, {headers: this.createAuthHeader()});
  }

  deleteRequest(path: string){
    return this.http.delete(baseUrl + path, {headers: this.createAuthHeader()});
  }

  getRequest(path: string, params?: any){
    return this.http.get(baseUrl + path, {params: params});
  }

  getBaseUrl() {
    return baseUrl;
  }
}
