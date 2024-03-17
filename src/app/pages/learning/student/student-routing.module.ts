import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { CourcesComponent } from './cources/cources.component';


const routes: Routes = [
  {
    path: "subscriptions",
    component: SubscriptionsComponent
  },
  {
    path: "cources",
    component: CourcesComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
