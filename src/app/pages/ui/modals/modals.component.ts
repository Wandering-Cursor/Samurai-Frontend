import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent {

  name: any;
  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService) { }

  // bread crum items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Base UI' }, { label: 'Modals', active: true }];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  opencenterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openGridmodal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openbackModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openfirstModal(template: TemplateRef<any>) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template);
  }

  lauchModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  scrollModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  varyingModal(template: TemplateRef<any>, name: any) {
    this.name = name
    this.modalRef = this.modalService.show(template, this.config);
  }

  fullModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  extralargeModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

}
