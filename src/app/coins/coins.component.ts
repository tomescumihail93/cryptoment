import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";

import { CoinsService } from "./coins.service";
import { Coin } from "./metadata/coin";

declare var require: any;

const data: any = require('../shared/data/chartist.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
  public coins: Coin[] = [];
  bgarray = [
    "gradient-yellow-green",
    "gradient-orange-deep-orange",
    "gradient-deep-purple-purple",
    "gradient-red-pink",
    "gradient-light-green-amber",
    "gradient-amber-amber",
    "gradient-purple-pink",
    "gradient-indigo-dark-blue",
    "gradient-teal-cyan",
    "gradient-blue-grey-blue-grey",
    "gradient-cyan-dark-green",
    "gradient-orange-amber",
    "gradient-indigo-blue",
    "gradient-brown-brown",
    "gradient-blue-grey-blue",
    "gradient-purple-deep-orange",
    "gradient-green-teal",
    "gradient-purple-deep-purple",
    "gradient-deep-purple-blue"
  ];
  // line chart configuration Starts
  WidgetlineChart: Chart = {
    type: 'Line', data: data['WidgetlineChart'],
    options: {
      axisX: {
        showGrid: true,
        showLabel: false,
        offset: 0,
      },
      axisY: {
        showGrid: false,
        low: 40,
        showLabel: false,
        offset: 0,
      },
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      fullWidth: true,
    },
  };
  // Line chart configuration Ends

  constructor(private coinService: CoinsService) { }

  ngOnInit() {
    this.getCoins();
  }

  getCoins() {
    // Get all comments
    console.log('get coins');
    this.coinService.getCoins()
      .subscribe(
      coins => { this.coins = coins, this.getColour() }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  getColour() {
    this.coins.forEach(coin => {
      coin.bg_color = this.bgarray[Math.floor(Math.random() * this.bgarray.length)]
    });
  }
}
