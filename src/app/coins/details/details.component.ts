import { Component, OnInit } from '@angular/core';
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
  public coin: Coin;
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
        this.coin = this.coinService.getCoinDetails(params['id']);
        console.log(this.coin);
      }
    });
  }

}
