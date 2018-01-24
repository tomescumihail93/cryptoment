import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { ChartistModule } from 'ng-chartist';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { ChartsModule } from 'ng2-charts';

import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsComponent } from './coins.component';
import { CoinsService } from "./coins.service";
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  imports: [
    CommonModule,
    CoinsRoutingModule,
    NgbModule,
    HttpModule,
    ChartistModule,
    ChartsModule,
    MatchHeightModule
  ],
  declarations: [CoinsComponent, ListComponent, DetailsComponent],
  providers: [
    CoinsService
  ]
})
export class CoinsModule { }
