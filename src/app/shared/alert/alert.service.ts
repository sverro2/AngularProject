import { Injectable } from '@angular/core';
import { AlertModel } from './alert.model';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class AlertService {
  private alertSubject = new Subject<AlertModel>();

  getAlertSubject() {
    return this.alertSubject;
  }
}
