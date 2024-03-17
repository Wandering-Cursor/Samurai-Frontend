import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { Error503Component } from './error503/error503.component';
import { OfflineComponent } from './offline/offline.component';

const routes: Routes = [
  {
    path:"404",
    component: Error404Component
  },
  {
    path: "500",
    component: Error500Component
  },
  {
    path: "503",
    component: Error503Component
  },
  {
    path: "offline",
    component: OfflineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
