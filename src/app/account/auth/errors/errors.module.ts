import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Page Route
import { ErrorRoutingModule } from "./errors-routing.module";

// Component
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { Error503Component } from './error503/error503.component';
import { OfflineComponent } from './offline/offline.component';

@NgModule({
  declarations: [
    OfflineComponent,
    Error500Component,
    Error503Component,
    Error404Component
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ErrorsModule { 
}
