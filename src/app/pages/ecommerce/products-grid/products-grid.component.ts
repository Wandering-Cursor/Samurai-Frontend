import { Component, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
// Data get
import { productgridModel } from './products-grid.model';
import { productList } from './data';
import { Options } from '@angular-slider/ngx-slider';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { selectData } from 'src/app/store/Product/product.selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { deleteproductsList, fetchproductsList } from 'src/app/store/Product/product.action';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
  providers: [DecimalPipe]
})
export class ProductsGridComponent {
  endItem: any
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  products!: any;
  allproducts!: any;
  productlist: any
  // Table data
  productList!: Observable<productgridModel[]>;
  searchResults: any;
  searchTerm: any;
  // Price Slider
  pricevalue: number = 100;
  minVal: number = 100;
  maxVal: number = 500;
  deleteId: any;
  priceoption: Options = {
    floor: 0,
    ceil: 800,
    translate: (value: number): string => {
      return '$' + value;
    },
  };

  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;

  constructor(public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Ecommerce', active: true },
      { label: 'Products Grid', active: true }
    ];

    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchproductsList());
      this.store.select(selectData).subscribe((data) => {
        this.products = data;
        this.productlist = data;
        this.products = this.productlist.slice(0, 12);
      })
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)
  }

  /**
* Range Slider Wise Data Filter
*/
  valueChange(value: number, boundary: boolean): void {
    if (boundary) {
      this.minVal = value;
    } else {
      this.maxVal = value;
      // this.products = productList.filter((product: any) => {
      //   return product.price <= value && product.price >= this;
      // }, this.minVal);
    }
  }

  // Remove Product
  removeItem(id: any) {
    this.deleteId = id;
    this.deleteRecordModal?.show()
  }

  confirmDelete() {
    this.store.dispatch(deleteproductsList({ id: this.deleteId.toString() }));
    this.deleteRecordModal?.hide()
  }

  // Category Filter
  categoryFilter(category: any) {
    this.products = this.productlist.filter((product: any) => {
      return product.category == category
    });
    this.products = this.products.slice(0, 10);
    if (this.products.length == 0) {
      (document.getElementById('search-result-elem') as HTMLElement).style.display = 'block'
    } else {
      (document.getElementById('search-result-elem') as HTMLElement).style.display = 'none'
    }
  }

  discountRates: number[] = [];

  // Discount Filter
  changeDiscount(e: any) {
    if (e.target.checked) {
      this.discountRates.push(e.target.defaultValue)

      this.products = this.productlist.filter((product: any) => {
        return product.ratings > e.target.defaultValue;
      });
    } else {
      for (var i = 0; i < this.discountRates.length; i++) {
        if (this.discountRates[i] === e.target.defaultValue) {
          this.discountRates.splice(i, 1)
        }
      }
    }
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.productlist.filter((item: any) => {
      return item.category.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    })
    this.products = this.searchResults.slice(0, 10);
    if (this.searchResults.length == 0) {
      (document.getElementById('search-result-elem') as HTMLElement).style.display = 'block'
    } else {
      (document.getElementById('search-result-elem') as HTMLElement).style.display = 'none'
    }
  }

  // Page changed
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.products = this.productlist.slice(startItem, this.endItem);
  }
}
