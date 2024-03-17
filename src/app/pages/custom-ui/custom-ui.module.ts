import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Module
import { CustomUiRoutingModule } from './customui-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// counter
import { CountUpModule } from 'ngx-countup';

// bootsrap component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Component
import { RibbonsComponent } from './ribbons/ribbons.component';
import { CounterComponent } from './counter/counter.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    RibbonsComponent,
    CounterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CustomUiRoutingModule,
    SharedModule,
    CountUpModule,
    BsDropdownModule.forRoot()
  ]
})
export class CustomUiModule { }
