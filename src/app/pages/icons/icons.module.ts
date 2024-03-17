import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Module
import { IconsRoutingModule } from './icons-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// component
import { RemixComponent } from './remix/remix.component';
import { BoxiconComponent } from './boxicon/boxicon.component';
import { MaterialdesignComponent } from './materialdesign/materialdesign.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { PhosphorComponent } from './phosphor/phosphor.component';


@NgModule({
  declarations: [
    RemixComponent,
    BoxiconComponent,
    MaterialdesignComponent,
    BootstrapComponent,
    PhosphorComponent
  ],
  imports: [
    CommonModule,
    IconsRoutingModule,
    SharedModule
  ]
})
export class IconsModule { }
