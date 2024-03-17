import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor(public toastService: ToastrService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Base UI' }, { label: 'Notifications', active: true }];
  }

  /**
   * Standard message
   */
  showStandard() {
    this.toastService.info('Your application was successfully sent.', 'Steex');
  }

  showSuccess() {
    this.toastService.success('Yey! Everything worked!', 'Toastr fun!');
  }

  showWarning() {
    this.toastService.warning('Something went wrong, try again.', 'Warning', {
      timeOut: 3000,
    });
  }

  showError() {
    this.toastService.error('Something is very wrong!', 'Major Error', {
      timeOut: 3000,
    });
  }

}
