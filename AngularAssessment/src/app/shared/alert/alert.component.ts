import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertModel } from './alert.model';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  alerts: AlertModel[] = [];
  alertSubscription: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertSubscription =  this.alertService.getAlertSubject().subscribe((alert: AlertModel) => {
      this.alerts.push(alert);
    })
  }

  ngOnDestroy(){
    this.alertSubscription.unsubscribe();
  }

}
