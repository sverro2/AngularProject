import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertService } from '../shared/alert/alert.service';
import { AlertModel } from '../shared/alert/alert.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private alert: AlertService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.hasConnectionToken()){
      return true;
    }else{
      this.alert.getAlertSubject().next(new AlertModel('danger', '> Je moet eerst inloggen voordat je deze pagina kan openen.', 5000));
      return false;
    }
  }
}
