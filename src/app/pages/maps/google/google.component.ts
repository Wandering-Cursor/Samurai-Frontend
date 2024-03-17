import { Component, Input, OnInit } from '@angular/core';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  }
};

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  longitude = -77.028333;
  latitude = -12.043333;
  zoom: number = 9;

  @Input() pitch: number = 10;
  @Input() scrollwheel: boolean = false;
  center: any;
  ngOnInit(): void {
    /**
      * BreadCrumb 
      */
    this.breadCrumbItems = [
      { label: 'Maps' },
      { label: 'Google maps', active: true }
    ];

  }
  mapOptions: google.maps.MapOptions = {
    center: { lat: 48.8588548, lng: 2.347035 },
    zoom: 13,
  };

  markers: MarkerProperties[] = [
    { position: { lat: 48.8584, lng: 2.2945 } }, // Eiffel Tower
    { position: { lat: 48.8606, lng: 2.3376 } }, // Louvre Museum
    { position: { lat: 48.8530, lng: 2.3499 } }, // Cathédrale Notre-Dame de Paris
  ];
}
