import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";
import { CoinsService } from "../coins.service";
import { Coin } from 'app/ico/model/coin';

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
  public coin: Coin = {
    id: "",
    name: "",
    rank: "",
    price_usd: "",
    price_btc: "",
    "24h_volume_usd": "",
    market_cap_usd: "",
    available_supply: "",
    total_supply: "",
    max_supply: "",
    precent_change_1h: "",
    precent_change_24h: "",
    precent_change_7d: "",
    last_updated: ""
}
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

  constructor(private route: ActivatedRoute, private coinService: CoinsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.coinService.getCoin(params['id']).subscribe(
          coin => this.coin = coin[0], //Bind to view
          err => {
            // Log errors if any
            console.log(err);
          });
      }
    });
  }
}
