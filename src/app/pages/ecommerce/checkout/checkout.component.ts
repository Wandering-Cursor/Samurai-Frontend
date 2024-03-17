import { Component, ViewChild } from '@angular/core';

// data Get
import { addressList } from './data';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
  
// Checkout Component
export class CheckoutComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  name: any;
  address: any;
  phone: any;
  type: any;

  addressData: any;

  @ViewChild('addAddressModal', { static: false }) addAddressModal?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  id: any;
  deleteId: any;

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Ecommerce', active: true },
      { label: 'Checkout', active: true }
    ];

    // Fetch Data
    this.addressData = addressList
  }

  // Add Address
  addAddress() {
    if (this.id) {
      var params = {
        id: this.id,
        name: this.name,
        address: this.address,
        phone: this.phone,
        type: this.type
      }
      this.addressData = this.addressData.map((address: { id: any; }) => address.id === this.id ? { ...address, ...params } : address);
    } else {
      this.addressData.push({
        id: this.addressData.length + 1,
        name: this.name,
        address: this.address,
        phone: this.phone,
        type: this.type
      })
    }
    this.id = ''
    this.name = ''
    this.address = ''
    this.phone = ''
    this.type = ''
    this.addAddressModal?.hide()
  }

  // Edit Address
  editAddress(id: any) {
    this.addAddressModal?.show()
    this.id = this.addressData[id].id
    this.name = this.addressData[id].name
    this.address = this.addressData[id].address
    this.phone = this.addressData[id].phone
    this.type = this.addressData[id].type
  }

  // Delete Address
  removeAddress(id: any) {
    this.deleteId = id;
    this.removeItemModal?.show()
  }

  deleteAddress() {
    addressList.splice(this.deleteId, 1)
    this.removeItemModal?.hide()
  }
}
