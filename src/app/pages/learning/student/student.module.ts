import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Page Route
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Bootstrap Component
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

// Component
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { CourcesComponent } from './cources/cources.component';



@NgModule({
  declarations: [
    SubscriptionsComponent,
    CourcesComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    FlatpickrModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentModule { }
