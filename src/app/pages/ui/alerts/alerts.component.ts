import { Component } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  breadCrumbItems!: Array<{}>;

  ngOnInit() {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Base UI' },
      { label: 'Alerts', active: true }
    ];
  }

  alerts: any = [];

  showalert(): void {
    this.alerts.push({
      type: 'success',
      msg: `Nice, you triggered this alert message!`,
      timeout: 5000,
      class: "alert,alert-outline"
    });
  }

}
