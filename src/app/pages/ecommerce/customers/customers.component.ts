import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DecimalPipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Store } from '@ngrx/store';
import { addcustomerData, deletecustomerData, fetchcustomerData, updatecustomerData } from 'src/app/store/Customer/customer.action';
import { selectData } from 'src/app/store/Customer/customer.selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [DecimalPipe]
})

// customer component
export class CustomersComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  endItem: any
  customers: any;
  customerForm!: UntypedFormGroup;
  submitted: boolean = false;
  public Editor = ClassicEditor;
  term: any;
  Customerlist: any
  deleteId: any;

  @ViewChild('showModal', { static: false }) showModal?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  customerdetail: any;


  constructor(private formBuilder: UntypedFormBuilder, public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Ecommerce', active: true },
      { label: 'Customers', active: true }
    ];

    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchcustomerData());
      this.store.select(selectData).subscribe((data) => {
        this.customers = data;
        this.Customerlist = data;
        this.customers = this.Customerlist.slice(0, 10);
        this.customerdetail = this.customers[0]
      })
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1200)

    /**
 * Form Validation
 */
    this.customerForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      create_date: ['', [Validators.required]],
      status: ['', [Validators.required]],
      img: ['']
    });
  }

  // Edit Customer
  editCustomer(id: any) {
    this.showModal?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Customer'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'
    document.querySelectorAll('#customer-img').forEach((element: any) => {
      element.src = this.customers[id].img;
    });
    this.customerForm.controls['img'].setValue(this.customers[id].img);
    this.customerForm.patchValue(this.customers[id]);
  }

  // Add Customer
  saveCustomer() {
    if (this.customerForm.valid) {
      if (this.customerForm.get('id')?.value) {
        const updatedData = this.customerForm.value;
        this.store.dispatch(updatecustomerData({ updatedData }));
      }
      else {
        this.customerForm.controls['id'].setValue(this.customers.length + 1)
        const newData = this.customerForm.value
        this.store.dispatch(addcustomerData({ newData }))

      }
      document.querySelectorAll('#customer-img').forEach((element: any) => {
        element.src = '';
      });
      setTimeout(() => {
        this.customerForm.reset();
      }, 1000);
      this.showModal?.hide()
    }
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll('#customer-img').forEach((element: any) => {
        element.src = this.imageURL;
      });
      this.customerForm.controls['img'].setValue(this.imageURL);
    };
    reader.readAsDataURL(file);
  }

  // Delete Customer
  removeCustomer(id: any) {
    this.deleteId = id;
    this.deleteRecordModal?.show()
  }

  deleteCustomer() {
    this.store.dispatch(deletecustomerData({ id: this.deleteId }));
    this.deleteRecordModal?.hide()
  }

  // follow unfollow button
  followbtn(ev: any) {
    ev.target.closest('button').classList.toggle('active')
  }

  // filterdata
  filterdata() {
    if (this.term) {
      this.customers = this.Customerlist.filter((el: any) => el.email.toLowerCase().includes(this.term.toLowerCase()) || el.name.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.customers = this.Customerlist.slice(0, 10);
    }
    // noResultElement
    this.updateNoResultDisplay();
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.customers = this.Customerlist.slice(startItem, this.endItem);
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement
    if (this.term && this.customers.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

  selectstatus() {
    const status = (document.getElementById("idStatus") as HTMLInputElement).value
    if (status) {
      this.customers = this.Customerlist.filter((data: any) => {
        return data.status == status
      })
    }
    else {
      this.customers = this.Customerlist.slice(0, 10);
    }
  }

  // view customer detail
  viewCustomer(id: any) {
    this.customerdetail = this.customers[id]
  }
}
