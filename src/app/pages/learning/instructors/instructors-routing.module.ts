import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';


const routes: Routes = [
  {
    path: "instructors-list",
    component: ListComponent
  },
  {
    path: "instructors-grid",
    component: GridComponent
  },
  {
    path: "instructors-overview",
    component: OverviewComponent
  },
  {
    path: "instructors-create",
    component: CreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorsRoutingModule { }
