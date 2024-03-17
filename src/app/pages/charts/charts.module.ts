import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// chart
import { NgApexchartsModule } from "ng-apexcharts";
// module
import { ChartsRoutingModule } from './charts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// component
import { LineComponent } from './line/line.component';
import { AreaComponent } from './area/area.component';
import { ColumnComponent } from './column/column.component';
import { BarComponent } from './bar/bar.component';
import { MixedComponent } from './mixed/mixed.component';
import { TimelineComponent } from './timeline/timeline.component';
import { CandlestickComponent } from './candlestick/candlestick.component';
import { BoxplotComponent } from './boxplot/boxplot.component';
import { BubbleComponent } from './bubble/bubble.component';
import { ScatterComponent } from './scatter/scatter.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { TreemapComponent } from './treemap/treemap.component';
import { PieComponent } from './pie/pie.component';
import { RadialbarComponent } from './radialbar/radialbar.component';
import { RadarComponent } from './radar/radar.component';
import { PolarareaComponent } from './polararea/polararea.component';
import { FunnelComponent } from './funnel/funnel.component';
import { RangeAreaComponent } from './range-area/range-area.component';

@NgModule({
  declarations: [
    LineComponent,
    AreaComponent,
    ColumnComponent,
    BarComponent,
    MixedComponent,
    TimelineComponent,
    CandlestickComponent,
    BoxplotComponent,
    BubbleComponent,
    ScatterComponent,
    HeatmapComponent,
    TreemapComponent,
    PieComponent,
    RadialbarComponent,
    RadarComponent,
    PolarareaComponent,
    FunnelComponent,
    RangeAreaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChartsRoutingModule,
    NgApexchartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartsModule { }
