import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { ProductsComponent } from './products/products.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { CustomersComponent } from './customers/customers.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SellersComponent } from './sellers/sellers.component';
import { SellerOverviewComponent } from './seller-overview/seller-overview.component';

const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "products-grid",
    component: ProductsGridComponent
  },
  {
    path: "product-details",
    component: ProductDetailsComponent
  },
  {
    path: "add-product",
    component: AddProductComponent
  },
  {
    path: "orders",
    component: OrdersComponent
  },
  {
    path: "order-overview",
    component: OrderOverviewComponent
  },
  {
    path: "customers",
    component: CustomersComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "sellers",
    component: SellersComponent
  },
  {
    path: "seller-overview",
    component: SellerOverviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
