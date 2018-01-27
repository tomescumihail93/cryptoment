import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";

import { CoinsService } from "../coins.service";
import { Coin } from "../metadata/coin";
import { CoinData } from "../metadata/coin-data";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

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
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('.5s ease-out', style({ opacity: '0' })),
      ]),
    ]),
  ]
})
export class ListComponent implements OnInit {
  public coins: Coin[] = [];
  public parsedData: Chart[] = [];
  public chartData: any[] = [];
  public isDataAvailable: boolean = false;
  public searchText: string = '';

  bgarray = [
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
    var id = this.chartData.find(coinData => coinData.symbol == coin.symbol).id;
    this.router.navigate(['../details', id], { relativeTo: this.route });
  }

  parseData() {
    this.chartData.forEach(dbFormattedCoin => {
      
      var localData = {
        labels: dbFormattedCoin["lastUpdated"],
        series: [dbFormattedCoin["priceUSD"]]
      };

      var low = Math.min(...dbFormattedCoin["priceUSD"]);
      var high = Math.max(...dbFormattedCoin["priceUSD"]);

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

