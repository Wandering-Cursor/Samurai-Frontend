import { Component } from '@angular/core';


// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

@Component({
  selector: 'app-vector',
  templateUrl: './vector.component.html',
  styleUrls: ['./vector.component.scss']
})
export class VectorComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  private root!: am5.Root;
  points = [
    { long: -1.21, lat: 52.77, name: 'Point A' },
    { long: 54.435973, lat: 55.378051, name: 'Point B' },
  ];
  pointSeries!: am5map.MapPointSeries;

  constructor() { }

  ngOnInit(): void {

    /**
     * BreadCrumb 
     */
    this.breadCrumbItems = [
      { label: 'Maps' },
      { label: 'Vector Maps', active: true }
    ];

    // Set world-map-line-markers amchart
    let root = am5.Root.new("world-map-line-markers");

    root.setThemes([am5themes_Animated.new(root)]);


    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        opacity: 1,
        projection: am5map.geoMercator(),
      })
    );

    chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
        fill: am5.color("rgb(222, 226, 232)"),
        stroke: am5.color("#fff"),
      })
    );

    // Create point series
    var pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );

    pointSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 6,
          stroke: am5.color("#74788d"),
          strokeWidth: 5,
          strokeOpacity: 0.5,
          fill: am5.color("#000"),
          fillOpacity: 1,
          cursorOverStyle: 'pointer',
        }),
      });
    });


    var Brazil = pointSeries.pushDataItem({ latitude: -14.2350, longitude: -51.9253 });
    var Egypt = pointSeries.pushDataItem({ latitude: 26.8206, longitude: 30.8025 });
    var China = pointSeries.pushDataItem({ latitude: 35.8617, longitude: 104.1954 });
    var Unitedstates = pointSeries.pushDataItem({ latitude: 37.0902, longitude: -95.7129 });
    var Norway = pointSeries.pushDataItem({ latitude: 60.472024, longitude: 8.468946 });
    var Ukraine = pointSeries.pushDataItem({ latitude: 48.379433, longitude: 31.16558 });
    var Russia = pointSeries.pushDataItem({ latitude: 61, longitude: 105 });
    var Canada = pointSeries.pushDataItem({ latitude: 56.1304, longitude: -106.3468 });
    var Greenland = pointSeries.pushDataItem({ latitude: 72, longitude: -42 });

    var lineSeries = chart.series.push(
      am5map.MapLineSeries.new(root, { lineType: "straight", stateAnimationEasing: am5.ease.out(am5.ease.cubic), })
    );


    lineSeries.pushDataItem({
      pointsToConnect: [Greenland, Egypt, China, Egypt, Brazil, Egypt, Unitedstates, Egypt, Norway, Egypt, Ukraine, Egypt, Russia, Egypt, Canada, Egypt]
    });

    lineSeries.mapLines.template.setAll({
      stroke: am5.color('rgb(128, 128, 128)'),
      fill: am5.color('rgb(128, 128, 128)'),
      strokeWidth: 1,
      strokeOpacity: 1,
      strokeDasharray: [6, 3, 6],
    });

    // Set world-map-markers amchart
    let markerRoot = am5.Root.new("world-map-markers");

    markerRoot.setThemes([am5themes_Animated.new(markerRoot)]);


    let markerChart = markerRoot.container.children.push(
      am5map.MapChart.new(markerRoot, {
        panX: "none",
        panY: "none",
        opacity: 1,
        projection: am5map.geoMercator(),
      })
    );

    markerChart.series.push(
      am5map.MapPolygonSeries.new(markerRoot, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
        fill: am5.color("rgb(222, 226, 232)"),
        stroke: am5.color("#fff"),
      })
    );

    // Create point series
    var pointSeries = markerChart.series.push(
      am5map.MapPointSeries.new(markerRoot, {})
    );

    pointSeries.bullets.push(function (_root, _series, dataItem: any) {
      return am5.Bullet.new(markerRoot, {
        sprite: am5.Circle.new(markerRoot, {
          radius: 6,
          stroke: am5.color("#fff"),
          strokeWidth: 5,
          strokeOpacity: 0.5,
          fill: am5.color(0xff0000),
          fillOpacity: 1,
          cursorOverStyle: 'pointer',
        }),
      });
    });

    pointSeries.pushDataItem({ latitude: 31.9474, longitude: 35.2272 });
    pointSeries.pushDataItem({ latitude: 61.524, longitude: 105.3188 });
    pointSeries.pushDataItem({ latitude: 56.1304, longitude: -106.3468 });
    pointSeries.pushDataItem({ latitude: 71.7069, longitude: -42.6043 });


    // Set world-map-markers amchart
    let imageRoot = am5.Root.new("world-map-markers-image");

    imageRoot.setThemes([am5themes_Animated.new(imageRoot)]);


    let ImageChart = imageRoot.container.children.push(
      am5map.MapChart.new(imageRoot, {
        panX: "none",
        panY: "none",
        opacity: 1,
        projection: am5map.geoMercator(),
      })
    );

    ImageChart.series.push(
      am5map.MapPolygonSeries.new(imageRoot, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
        fill: am5.color("rgb(222, 226, 232)"),
        stroke: am5.color("#fff"),
      })
    );

    // Create point series
    var pointSeries = ImageChart.series.push(
      am5map.MapPointSeries.new(imageRoot, {})
    );

    pointSeries.bullets.push(function (_root, _series, dataItem: any) {
      return am5.Bullet.new(imageRoot, {
        sprite: am5.Picture.new(imageRoot, {
          width: 18,
          height: 20,
          src: 'assets/images/logo-sm.png',
        }),
      });
    });

    pointSeries.bullets.push(function () {
      return am5.Bullet.new(imageRoot, {
        sprite: am5.Label.new(imageRoot, {
          text: "{name}",
          populateText: true
        })
      });
    });

    pointSeries.pushDataItem({ latitude: 31.9474, longitude: 35.2272 });
    pointSeries.pushDataItem({ latitude: 61.524, longitude: 105.3188 });
    pointSeries.pushDataItem({ latitude: 56.1304, longitude: -106.3468 });
    pointSeries.pushDataItem({ latitude: 71.7069, longitude: -42.6043 });

    // Set usa amchart
    let USARoot = am5.Root.new("usa-vectormap");

    USARoot.setThemes([am5themes_Animated.new(USARoot)]);


    let USAChart = USARoot.container.children.push(
      am5map.MapChart.new(USARoot, {
        panX: "none",
        panY: "none",
        opacity: 1,
        projection: am5map.geoAlbersUsa(),
      })
    );

    USAChart.series.push(
      am5map.MapPolygonSeries.new(USARoot, {
        geoJSON: am5geodata_worldLow,
        include: ["US"],
        fill: am5.color("rgb(222, 226, 232)"),
        // stroke: am5.color("#fff"),
      })
    );


    // Create series for labels
    var pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        polygonIdField: "polygonId"
      })
    );

    pointSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          fontSize: 10,
          centerX: am5.p50,
          centerY: am5.p50,
          text: "{name}",
          populateText: true
        })
      });
    });

    // Set canada amchart
    let canadaRoot = am5.Root.new("canada-vectormap");

    canadaRoot.setThemes([am5themes_Animated.new(canadaRoot)]);


    let canadaChart = canadaRoot.container.children.push(
      am5map.MapChart.new(canadaRoot, {
        panX: "rotateX",
        panY: "none",
        opacity: 1,
        projection: am5map.geoNaturalEarth1(),
      })
    );

    canadaChart.series.push(
      am5map.MapPolygonSeries.new(canadaRoot, {
        geoJSON: am5geodata_worldLow,
      })
    );

    var graticuleSeries = canadaChart.series.insertIndex(
      0, am5map.GraticuleSeries.new(root, {})
    );

    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color('#74788d'),
      strokeOpacity: 0.2
    });

    var backgroundSeries = canadaChart.series.unshift(
      am5map.MapPolygonSeries.new(canadaRoot, {})
    );

    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color('#fff'),
      stroke: am5.color('#fff'),
    });

    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });
  }


}
