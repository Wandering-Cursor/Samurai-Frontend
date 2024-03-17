import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeafletComponent } from './leaflet/leaflet.component';
import { GoogleComponent } from './google/google.component';
import { VectorComponent } from './vector/vector.component';

const routes: Routes = [
  {
    path: 'leaflet',
    component: LeafletComponent
  },
  {
    path: 'google',
    component: GoogleComponent
  }, {
    path: 'vector',
    component: VectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
