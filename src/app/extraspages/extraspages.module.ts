import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Page Route
import { ExtrapagesRoutingModule } from './extraspages-routing.module';

// Component
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

@NgModule({
  declarations: [
    MaintenanceComponent,
    ComingSoonComponent
  ],
  imports: [
    CommonModule,
    ExtrapagesRoutingModule
  ]
})
export class ExtraspagesModule { }
