import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as Chartist from 'chartist';
import * as chartsData from '../../shared/data/chartjs';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";

import { CoinsService } from "../coins.service";
import { CoinData } from '../metadata/coin-data';
import { Score } from "../metadata/score";

declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public coin: CoinData = {
    id: "",
    name: "",
    symbol: "",
    rank: "",
    priceUSD: [],
    priceBTC: [],
    volume24h: [],
    marketCapUSD: [],
    availableSupply: [],
    totalSupply: [],
    maxSupply: "",
    percentChange1h: "",
    percentChange24h: "",
    percentChange7d: "",
    lastUpdated: [],
  };
  public scores: Score;
  public loaded: boolean = false;

  public empty: any = {
    labels: [],
    series: []
  }

  // Radar
  public radarChartLabels: string[] = [
    'Advisors',
    'Communication',
    'Community',
    'Github',
    'Product',
    'Social',
    'Team'
  ]

  public radarChartData: any[] = [{
    data: [0, 0, 0, 0, 0, 0, 0], label: 'Score'
  }]; //data, label
  public radarChartType = 'radar';
  public radarChartColors: any[] = [
    {
      backgroundColor: ["rgba(216, 27, 96, 0.8)"]
    },
    {
      backgroundColor: ["rgba(0, 157, 160, 0.8)"]
    }
  ];
  public radarChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false
  };

  // Line area chart 2 configuration Starts Price chart
  public lineArea2: Chart = {
    type: 'Line',
    data: this.empty,
    options: {
      showArea: true,
      fullWidth: true,
      lineSmooth: Chartist.Interpolation.none(),
      axisX: {
        showGrid: false,
        // scaleMinSpace: 20
        offset: 100
      },
      axisY: {
        low: 0,
        offset: 0,
        scaleMinSpace: 50,
      }
    },
    responsiveOptions: [
      ['screen and (max-width: 640px) and (min-width: 381px)', {
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 2 === 0 ? value : null;
          }
        }
      }],
      ['screen and (max-width: 380px)', {
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 3 === 0 ? value : null;
          }
        }
      }]
    ],
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient2',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-opacity': '0.2',
          'stop-color': 'rgba(255, 255, 255, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-opacity': '0.2',
          'stop-color': 'rgba(0, 201, 255, 1)'
        });

        defs.elem('linearGradient', {
          id: 'gradient3',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0.3,
          'stop-opacity': '0.2',
          'stop-color': 'rgba(255, 255, 255, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-opacity': '0.2',
          'stop-color': 'rgba(132, 60, 247, 1)'
        });
      },
      draw(data: any): void {
        var circleRadius = 4;
        if (data.type === 'point') {

          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: circleRadius,
            class: 'ct-point-circle'
          });
          data.element.replace(circle);
        }
        else if (data.type === 'label') {
          // adjust label position for rotation
          const dX = data.width / 2 + (30 - data.width)
          data.element.attr({ x: data.element.attr('x') - dX })
        }
        // if (data.type === 'label' &&
        //   data.axis.units.pos === 'x' &&
        //   data.index === data.labels.length - 1) {
        //   data.element.remove();
        // }
      }
    },
  };
  // Line area chart 2 configuration Ends
  // this.lineArea2.Line

  // Line area chart configuration Starts VOLUME chart
  lineArea: Chart = {
    type: 'Line',
    data: this.empty,
    options: {
      showArea: true,
      fullWidth: true,
      // onlyInteger: true,
      axisY: {
          offset: 100,
        scaleMinSpace: 50
      },
      axisX: {
        offset: 0,
        showGrid: false
      }
    },
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient',
          x1: 0,
          y1: 1,
          x2: 1,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 201, 255, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(146, 254, 157, 1)'
        });

        defs.elem('linearGradient', {
          id: 'gradient1',
          x1: 0,
          y1: 1,
          x2: 1,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(132, 60, 247, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(56, 184, 242, 1)'
        });
      },

    },
  };
  // Line area chart configuration Ends

  // Line chart configuration Starts MARKETCAP chart
  lineChart: Chart = {
    type: 'Line', data: this.empty,
    options: {
      axisX: {
        showGrid: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      fullWidth: true,
      offset: 0,
    },
    events: {
      draw(data: any): void {
        var circleRadius = 4;
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: circleRadius,
            class: 'ct-point-circle'
          });

          data.element.replace(circle);
        }
        else if (data.type === 'label') {
          // adjust label position for rotation
          const dX = data.width / 2 + (30 - data.width)
          data.element.attr({ x: data.element.attr('x') - dX })
        }
      }
    },

  };
  // Line chart configuration Ends

  //  Bar chart configuration Starts
  BarChart: Chart = {
    type: 'Bar', data: data['DashboardBar'], options: {
      axisX: {
        showGrid: false,
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      low: 0,
      high: 60, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    },
    responsiveOptions: [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ],
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient4',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(238, 9, 121,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(255, 106, 0, 1)'
        });
        defs.elem('linearGradient', {
          id: 'gradient5',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 75, 145,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(120, 204, 55, 1)'
        });

        defs.elem('linearGradient', {
          id: 'gradient6',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(132, 60, 247,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(56, 184, 242, 1)'
        });
        defs.elem('linearGradient', {
          id: 'gradient7',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(155, 60, 183,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(255, 57, 111, 1)'
        });

      },
      draw(data: any): void {
        var barHorizontalCenter, barVerticalCenter, label, value;
        if (data.type === 'bar') {

          data.element.attr({
            y1: 195,
            x1: data.x1 + 0.001
          });

        }
      }
    },

  };
  // Bar chart configuration Ends

  constructor(private route: ActivatedRoute, private coinService: CoinsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        //parse id for coinCheckUp data
        var coinCheckupId = params['id'];

        this.coinService.getCoin(params['id'], coinCheckupId).subscribe(
          (coin: any[]) => { this.coin = coin[0]; this.scores = coin[1]; this.parseData() }, //Bind to view
          err => {
            // Log errors if any
            console.log(err);
          });
      }
    });
  }

  parseData() {
    console.log(this.coin);

    //Create variables for Price BTC/USD chart
    var normalizedUSD = this.normalize(this.coin.priceUSD);
    var normalizedBTC = this.normalize(this.coin.priceBTC);
    var date = this.coin.lastUpdated.map(date => this.timeConverter(date));
    var priceChart = {
      labels: date,
      series: [normalizedUSD, normalizedBTC]
    }
    this.coin.marketCapUSD[this.coin.marketCapUSD.length-1];

    //Create variables for Volume
    var volume = this.coin.volume24h.map(volume => parseFloat(volume));
    var volumeChart = {
      labels: date,
      series: [volume]
    }

    //Create variables for Marketcap
    var marketCap = this.coin.marketCapUSD.map(price => parseFloat(price));
    console.log(marketCap);
    var marketCapChart = {
      labels: date,
      series: [marketCap]
    }
    
    this.lineArea2.data = priceChart;
    this.lineArea.data = volumeChart;
    this.lineChart.data = marketCapChart;


    //Create hexagram
    var hexData: number[] = [];
    Object.keys(this.scores).forEach(key => {
      if( key === 'advisorsScore' || 
          key === 'communicationScore' ||
          key === 'communityScore' ||
          key === 'githubScore' ||
          key === 'productScore' ||
          key === 'socialMediaScore' ||
          key === 'teamScore') {
            
            var score = this.scores[key] == null ? 0:parseInt(this.scores[key]);
            hexData.push(score);
      }
    });
    this.radarChartData[0].data = hexData;

    this.loaded = true;
  }

  normalize(data: string[]) {
    var parsedValues: number[] = data.map(price => parseFloat(price));
    return parsedValues.map(price => (price - Math.min(...parsedValues)) / (Math.max(...parsedValues) - Math.min(...parsedValues)));
  }

  //Eg. 12323202 = 25 May 2017
  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + hour + ':' + min;
    return time;
  }
}
