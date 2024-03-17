import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sweetalert',
  templateUrl: './sweetalert.component.html',
  styleUrls: ['./sweetalert.component.scss']
})
export class SweetalertComponent {

  // bread crum items
  breadCrumbItems!: Array<{}>;

  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Advance UI' }, { label: 'Sweet Alerts', active: true }];
  }


  basicMessage() {
    Swal.fire({ text: 'Any fool can use a computer', confirmButtonColor: '#4b93ff', showCancelButton: true, });
  }


  titleText() {
    Swal.fire({
      title: 'The Internet?',
      text: 'That thing is still around?',
      icon: 'question',
      iconColor: '#1ea6d3',
      confirmButtonColor: '#4b93ff',
      showCancelButton: true,
    });
  }


  successmsg() {
    Swal.fire({
      title: 'Good job!',
      text: 'You clicked the button!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#4b93ff',
      cancelButtonColor: '#ef476f',
      confirmButtonText: 'OK',

    });
  }

  modelTitle() {
    Swal.fire({
      title: 'Oops...',
      text: 'Something went wrong!',
      icon: 'error',
      footer: '<a href="">Why do I have this issue?</a>',
      confirmButtonColor: '#4b93ff',
      confirmButtonText: 'OK',
      showCancelButton: true,
    }).then(result => {
      if (result.value) {
        Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', });
      }
    });
  }


  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
          confirmButtonColor: 'rgb(3, 142, 220)',
          showCancelButton: true,
        })
      }
    });
  }
  imageHeader() {
    Swal.fire({
      title: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: 'assets/images/logo-sm.png',
      imageHeight: 50,
      confirmButtonColor: 'rgb(3, 142, 220)',
      showCancelButton: true,
    });
  }
  timer() {
    let timerInterval: any;
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      showCancelButton: true,
      didOpen: () => {
        // Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b: any = content.querySelector('b');
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  }

  custom() {
    Swal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="//sweetalert2.github.io">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="mdi mdi-thumb-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: ' <i class= "mdi mdi-thumb-down"></i>',
      confirmButtonColor: '#06d6a0',
      cancelButtonColor: '#ef476f',
    });
  }

  customImg() {
    Swal.fire({
      imageUrl: 'https://placeholder.pics/svg/300x1500',
      imageHeight: 1500,
      confirmButtonText: 'OK',
      confirmButtonColor: '#4b93ff',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      showCancelButton: true,
    });
  }


  threeBtn() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2',
        denyButton: 'btn btn-info ms-2',
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Do you want to save the changes?',
        confirmButtonText: 'Save',
        denyButtonText: 'Don\'t save',
        cancelButtonText: 'Cancel',
        showCancelButton: true,

      })
      .then(result => {
        if (result.value) {
          Swal.fire({
            title: 'Saved!',
            confirmButtonColor: 'btn btn-primary',
            icon: 'success',
          }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title: 'Cancelled',
            confirmButtonColor: 'rgb(3, 142, 220)',
            showCancelButton: true,
            icon: 'error',
          }
          );

        }
      });
  }
  position() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      showCancelButton: true,
      timer: 1500,
    });
  }

  customBackground() {
    Swal.fire({
      title: 'Custom width, padding, background.',
      width: 600,
      padding: 100,
      confirmButtonColor: '#556ee6',
      showCancelButton: true,
      background: '#ffff',
    });
  }

  ajax() {
    Swal.fire({
      title: 'Submit email to run ajax request',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      confirmButtonColor: 'btn btn-primary',
      cancelButtonColor: 'btn btn-danger',
      preConfirm: (email) => {
        // eslint-disable-next-line no-unused-vars
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (email === 'taken@example.com') {
              Promise.reject(new Error('This email is already taken.'));
            } else {
              resolve();
            }
          }, 2000);
        });
      },

      allowOutsideClick: false,
    }).then((email) => {
      Swal.fire({
        icon: 'success',
        title: 'Ajax request finished!',
        confirmButtonColor: '#4b93ff',
        showCancelButton: true,
        html: 'Submitted email: ' + email,
      });
    });
  }

  successModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  ErrorMsg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  WaningMsg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  JoinMsg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  EmailMsg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  notificationMsg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

}
