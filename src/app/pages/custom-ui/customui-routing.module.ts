import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RibbonsComponent } from './ribbons/ribbons.component';
import { CounterComponent } from './counter/counter.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'ribbons',
    component: RibbonsComponent
  },
  {
    path: 'counter',
    component: CounterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomUiRoutingModule { }
