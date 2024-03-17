import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { GridComponent } from './grid/grid.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { PropertyOverviewComponent } from './property-overview/property-overview.component';
import { AddPropertiesComponent } from './add-properties/add-properties.component';
import { EarningsComponent } from './earnings/earnings.component';

const routes: Routes = [
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'property-overview',
    component: PropertyOverviewComponent
  },
  {
    path: 'agent', loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule)
  },
  {
    path: 'agencies', loadChildren: () => import('./agencies/agencies.module').then(m => m.AgenciesModule)
  },
  {
    path: 'add-properties',
    component:AddPropertiesComponent
  },
  {
    path: 'earnings',
    component:EarningsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealEstateRoutingModule { }
