import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';
import { CategoryComponent } from './category/category.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: "list",
    component: ListComponent
  },
  {
    path: "grid",
    component: GridComponent
  },
  {
    path: "category",
    component: CategoryComponent
  },
  {
    path: "overview",
    component: OverviewComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
