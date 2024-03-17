import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineComponent } from './line/line.component';
import { AreaComponent } from './area/area.component';
import { ColumnComponent } from './column/column.component';
import { BarComponent } from './bar/bar.component';
import { MixedComponent } from './mixed/mixed.component';
import { CandlestickComponent } from './candlestick/candlestick.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BoxplotComponent } from './boxplot/boxplot.component';
import { BubbleComponent } from './bubble/bubble.component';
import { ScatterComponent } from './scatter/scatter.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { TreemapComponent } from './treemap/treemap.component';
import { PieComponent } from './pie/pie.component';
import { RadarComponent } from './radar/radar.component';
import { RadialbarComponent } from './radialbar/radialbar.component';
import { PolarareaComponent } from './polararea/polararea.component';
import { FunnelComponent } from './funnel/funnel.component';
import { RangeAreaComponent } from './range-area/range-area.component';

const routes: Routes = [
  {
    path: 'apex-line',
    component: LineComponent
  },
  {
    path: 'apex-area',
    component: AreaComponent
  },
  {
    path: 'apex-column',
    component: ColumnComponent
  },
  {
    path: 'apex-bar',
    component: BarComponent
  },
  {
    path: 'apex-mixed',
    component: MixedComponent
  },
  {
    path: 'apex-timeline',
    component: TimelineComponent
  },
  {
    path: 'apex-candlestick',
    component: CandlestickComponent
  },
  {
    path: 'apex-boxplot',
    component: BoxplotComponent
  },
  {
    path: 'apex-bubble',
    component: BubbleComponent
  },
  {
    path: 'apex-scatter',
    component: ScatterComponent
  },
  {
    path: 'apex-heatmap',
    component: HeatmapComponent
  },
  {
    path: 'apex-treemap',
    component: TreemapComponent
  },
  {
    path: 'apex-pie',
    component: PieComponent
  },
  {
    path: 'apex-radar',
    component: RadarComponent
  },
  {
    path: 'apex-radialbar',
    component: RadialbarComponent
  },
  {
    path: 'apex-polar',
    component: PolarareaComponent
  },
  {
    path: 'funnel',
    component: FunnelComponent
  },
  {
    path: "range-area",
    component: RangeAreaComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
