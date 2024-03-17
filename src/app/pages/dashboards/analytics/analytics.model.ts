import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  colors?: string[];
  yaxis?: ApexYAxis | ApexYAxis[];
  legend?: ApexLegend;
  labels?: string[] | number[];
};

export interface browserModel {
  id: any,
  img: string,
  browsers: string
  click: string,
  rate: string
}

export interface TopPageModel {
  activepage: string,
  active: string
  users: string
}
