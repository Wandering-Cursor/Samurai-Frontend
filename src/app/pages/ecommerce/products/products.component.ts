import { Component, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { cloneDeep } from 'lodash';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { selectData, selectDataLoading } from 'src/app/store/Product/product.selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { addproductsList, deleteproductsList, fetchproductsList, updateproductLists } from 'src/app/store/Product/product.action';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [DecimalPipe,]
})

// Product Component
export class ProductsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  productForm!: UntypedFormGroup;
  submitted = false;
  products: any;
  masterSelected!: boolean;
  endItem: any
  // Table data
  allproducts: any;

  files: File[] = [];
  @ViewChild('showModal', { static: false }) showModal?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  deleteId: any;
  content: any;

  constructor(private formBuilder: UntypedFormBuilder, public store: Store, private datePipe: DatePipe,) {
  }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Products', active: true }
    ];

    // Fetch Data
    this.store.dispatch(fetchproductsList());
    this.store.select(selectDataLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });
    this.store.select(selectData).subscribe((data) => {
      this.products = data;
      this.allproducts = data;
      // setTimeout(() => {
        this.products = cloneDeep(this.allproducts.slice(0, 10));
      // }, 100);
    })
    

    /**
     * Form Validation
     */
    this.productForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      price: ['', [Validators.required]],
      img: ['', [Validators.required]],
      publish: null
    });
  }

  public items: string[] = ['Adidas', 'Boat', 'Puma', 'Realme'];
  // Sort Data
  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.products]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.products = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }


  // dropzone
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  };

  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
      this.productForm.controls['img'].setValue(event[0].dataURL);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // Edit Data
  editList(id: any) {
    this.showModal?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    var editData = this.products[id]
    this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.img_alt, 'size': 1024, });
    this.productForm.patchValue(this.products[id]);
  }

  /**
  * Save product
  */
  saveProduct() {
    if (this.productForm.valid) {
      if (this.productForm.get('id')?.value) {
        const updatedData = this.productForm.value;
        this.store.dispatch(updateproductLists({ updatedData }));
      }
      else {
        this.productForm.controls['id'].setValue(this.products.length + 1)
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(currentDate, 'dd MMM, yyyy');
        this.productForm.controls['publish'].setValue(formattedDate);
        const newData = {
          orders: '0',
          ...this.productForm.value,
        }
        this.store.dispatch(addproductsList({ newData }));
      }

      this.showModal?.hide()
      setTimeout(() => {
        this.productForm.reset();
      }, 2000);
      this.submitted = true
    }
  }
  // deleteddata
  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deleteproductsList({ id: this.deleteId.toString() }));
    }
    this.store.dispatch(deleteproductsList({ id: this.checkedValGet.toString() }));
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.products = this.products.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));

    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].states == true) {
        result = this.products[i].id;
        checkedVal.push(result);
      }
    }

    this.checkedValGet = checkedVal;
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }

  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].states == true) {
        result = this.products[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }


  // Delete Product
  removeItem(id: any) {
    this.deleteId = id
    this.deleteRecordModal?.show()
  }



  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.products = this.allproducts.slice(startItem, this.endItem);
  }
  term: any

  // filterdata
  filterdata() {
    if (this.term) {
      this.products = this.allproducts.filter((el: any) => el.title.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.products = this.allproducts
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;
    if (this.term && this.products.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }
}
