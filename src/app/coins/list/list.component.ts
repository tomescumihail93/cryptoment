import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";

import { CoinsService } from "../coins.service";
import { Coin } from "../metadata/coin";
import { CoinData } from "../metadata/coin-data";

declare var require: any;

const data: any = require('../../shared/data/chartist.json');
// const chartData: any = require("../../shared/data/finalHistoricalCoinMarketCapData.json");

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public coins: Coin[] = [];
  public parsedData: Chart[] = [];
  public chartData: any[] = [];
  public isDataAvailable: boolean = false;

  bgarray = [
    /*
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
  */
    "gradient-green-tea",
    "gradient-blueberry",
    "gradient-king-yna",
    "gradient-brady-brady-fun-fun",
    "gradient-flickr",
    "gradient-cosmic-fusion",
    "gradient-harmonic-energy",
    "gradient-purple-amber",
    "gradient-orange-amber",
    "gradient-man-of-steel",
    "gradient-back-to-earth",
    "gradient-ibiza-sunset",
    "gradient-crystal-clear",
    "gradient-pomegranate"
  ];
  /**
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
**/
  constructor(private coinService: CoinsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCoins();
    this.getCoinData();
  }

  getCoinData() {
    this.coinService.getCoinData()
      .subscribe(
      coinData => { this.chartData = coinData; this.isDataAvailable = true; this.parseData(); }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
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

  loadDetails(coin) {
    this.router.navigate(['../details', coin.id], { relativeTo: this.route });
  }

  parseData() {
    console.log(this.chartData);
    this.chartData.forEach(dbFormattedCoin => {
      
      var localData = {
        labels: dbFormattedCoin["lastUpdated"],
        series: [dbFormattedCoin["priceUSD"]]
      };

      var low = Math.min(...dbFormattedCoin["priceUSD"]);
      var high = Math.max(...dbFormattedCoin["priceUSD"]);
      console.log(localData)


      this.parsedData.push({
        type: 'Line', data: localData,
        options: {
          axisX: {
            showGrid: true,
            showLabel: false,
            offset: 0,
          },
          axisY: {
            showGrid: false,
            low: low,
            high: high,
            showLabel: false,
            offset: 0,
          },
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          fullWidth: true,
        },

      });
    })
  }


}

