import {
    ApexAxisChartSeries,
    ApexChart,
    ApexStroke,
    ApexTooltip,
    ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
    series?: ApexAxisChartSeries | any;
    chart?: ApexChart;
    colors?: string[];
    stroke?: ApexStroke;
    tooltip?: ApexTooltip;
    fill?: ApexFill;
};

export interface sellerModel {
    id?: any;
    name?: any;
    img?: any;
    seller?: any;
    email?: any;
    phone?: any;
    stock?: any;
    revenue?: any;
    chart?: any;
}

export interface Overviewmodel {
    id: string;
    img: string;
    name: string;
    category: string;
    stock: string;
    price: string;
    orders: string;
    rating: string;
    publishedDate: string;
}