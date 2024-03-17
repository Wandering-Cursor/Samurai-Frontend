import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { latLng, tileLayer, polygon, marker, circle } from 'leaflet';
import { fetchlistingGridData } from 'src/app/store/App-realestate/apprealestate.action';
import { selectData } from 'src/app/store/App-realestate/apprealestate-selector';
import { selectagentData } from 'src/app/store/Agent/agent-selector';
import { Store } from '@ngrx/store';
import { fetchagentData } from 'src/app/store/Agent/agent.action';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [DecimalPipe]
})

// Overview Component
export class OverviewComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  agentOverviewCharts: any;
  products: any;
  agents: any;
  masterSelected!: boolean;
  productslist: any
  bedroom: any;
  deleteID: any;
  currentTab: any = 'property';
  agentlist: any;

  constructor(public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Agencies', active: true },
      { label: 'Overview', active: true }
    ];

    // Fetch Data
    this.store.dispatch(fetchlistingGridData());
    this.store.select(selectData).subscribe((data) => {
      this.products = data;
      this.productslist = data;
      this.products = this.productslist.slice(0, 8)
    });

    this.store.dispatch(fetchagentData());
    this.store.select(selectagentData).subscribe((data) => {
      this.agents = data;
      this.agentlist = data;
      this.agents = this.agentlist.slice(0, 8)
    });
  }

  // Agent Pagination
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.agents = this.agentlist.slice(startItem, endItem);
  }

  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }

  /**
   * Markers Maps
   */
  markers = {
    layers: [
      tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w",
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
        }
      )
    ],
    zoom: 13,
    center: latLng(51.505, -0.09)
  };
  markersLayers = [
    circle([51.508, -0.11], { color: "#0ab39c", fillColor: "#0ab39c", radius: 500 }),
    polygon([[51.509, -0.08], [51.503, -0.06], [51.51, -0.047],], { color: "#405189", fillColor: "#405189" }),
    marker([51.5, -0.09])
  ];
}
