import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

// Create Component
export class CreateComponent {


  // bread crumb items
  breadCrumbItems!: Array<{}>;

  invoices: any;
  submitted = false;
  InvoicesForm!: UntypedFormGroup;
  paymentSign = "$";
  subtotal = 0;
  taxRate = 0.18;
  shippingRate = 65.0;
  discountRate = 0.30;

  userForm!: UntypedFormGroup;
  forms: any = []; // Array to store form indices

  constructor(private route: ActivatedRoute, private formBuilder: UntypedFormBuilder, public router: Router) {
    this.userForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      quantity: [0],
      price: []
    })

    this.forms.push(this.userForm.value)

    this.InvoicesForm = this.formBuilder.group({
      companyAddress: ['', [Validators.required]],
      companyaddpostalcode: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      companyEmail: ['', [Validators.required]],
      companyWebsite: ['', [Validators.required]],
      companyContactno: ['', [Validators.required]],
      billingName: ['', [Validators.required]],
      billingAddress: ['', [Validators.required]],
      billingPhoneno: ['', [Validators.required]],
      billingTaxno: ['', [Validators.required]],
      same: ['', [Validators.required]],
      shippingName: ['', [Validators.required]],
      shippingAddress: ['', [Validators.required]],
      shippingPhoneno: ['', [Validators.required]],
      shippingTaxno: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      quantity: [0, [Validators.required]],
      items: [''],
      subtotal: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      charge: ['', [Validators.required]],
      total: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Invoice', active: true },
      { label: 'Create Invoice', active: true }
    ];
  }
  // File Upload
  imageURL: string | undefined;
  fileChange(event: any, id: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    document.getElementById('')

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      if (id == '0') {
        (document.getElementById('product-img') as HTMLImageElement).src = this.imageURL;
      } else {
        (document.getElementById('logo-img') as HTMLImageElement).src = this.imageURL;
      }
    }
    reader.readAsDataURL(file)
  }

   /**
 * Form data get
 */
   get form() {
    return this.InvoicesForm.controls;
  }

  // Add Item
  addItem(): void {
    this.userForm = this.formBuilder.group({
      productName: '',
      rate: '',
      quantity: 0,
      price: ''
    })
    
    this.forms.push(this.userForm.value)
  }

  // Remove Item
  removeItem(index: any) {
    this.forms.splice(index, 1);
  }

  otherPayment(ev: any) {
    this.paymentSign = ev.target.value
  }

  // Default
  counter: any = 0;
  price: any = 0;
  calculateQty(index: number, id: any) {
    this.price = 0
    if (id == 0) {
      this.counter = (document.getElementById('product-qty-' + index) as HTMLInputElement).value;
      if (this.counter > 0) {
        this.counter--;
      }
    } else {
      this.counter = (document.getElementById('product-qty-' + index) as HTMLInputElement).value;
      this.counter++;
    }

    (document.getElementById('product-qty-' + index) as HTMLInputElement).value = this.counter;

    const rate = this.InvoicesForm.get('rate')?.value;
    (document.getElementById('productPrice-' + index) as HTMLInputElement).value = (this.counter * rate).toFixed(2);
    const price = document.querySelectorAll('.invoice-product-line-price')
    price.forEach((item: any) => {
      this.price += parseFloat((item as HTMLInputElement).value)
    })

    this.InvoicesForm.controls['subtotal'].setValue(this.price);

    const subtotal = this.InvoicesForm.get('subtotal')?.value
    var tax = parseFloat((subtotal * this.taxRate).toFixed(2));
    var discount = subtotal * this.discountRate;
    var shipping = subtotal > 0 ? this.shippingRate : 0;
    var total = subtotal + tax + shipping - discount;

    this.InvoicesForm.controls['tax'].setValue(tax);
    this.InvoicesForm.controls['discount'].setValue(discount);
    this.InvoicesForm.controls['charge'].setValue(shipping);
    this.InvoicesForm.controls['total'].setValue(total);
  }

  /* Save user */
  saveUser() {
    this.submitted = true
  }
}
