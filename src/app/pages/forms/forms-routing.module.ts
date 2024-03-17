import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementsComponent } from './elements/elements.component';
import { FormselectComponent } from './formselect/formselect.component';
import { CheckboxesComponent } from './checkboxes/checkboxes.component';
import { PickersComponent } from './pickers/pickers.component';
import { InputmaskComponent } from './inputmask/inputmask.component';
import { AdvanceComponent } from './advance/advance.component';
import { RangerComponent } from './ranger/ranger.component';
import { ValidationComponent } from './validation/validation.component';
import { WizardComponent } from './wizard/wizard.component';
import { EditorsComponent } from './editors/editors.component';
import { UploadComponent } from './upload/upload.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'element',
    component: ElementsComponent
  },
  {
    path: 'select',
    component: FormselectComponent
  },
  {
    path: 'checkboxs-radios',
    component: CheckboxesComponent
  },
  {
    path: 'pickers',
    component: PickersComponent
  },
  {
    path: 'masks',
    component: InputmaskComponent
  },
  {
    path: 'advanced',
    component: AdvanceComponent
  },
  {
    path: 'range-sliders',
    component: RangerComponent
  },
  {
    path: 'validation',
    component: ValidationComponent
  },
  {
    path: 'wizard',
    component: WizardComponent
  },
  {
    path: 'editors',
    component: EditorsComponent
  },
  {
    path: 'file-uploads',
    component: UploadComponent
  },
  {
    path: 'layouts',
    component: LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
