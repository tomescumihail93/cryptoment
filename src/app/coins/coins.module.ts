import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { ChartistModule } from 'ng-chartist';

import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsComponent } from './coins.component';
import { CoinsService } from "./coins.service";

@NgModule({
  imports: [
    CommonModule,
    CoinsRoutingModule,
    NgbModule,
    HttpModule,
    ChartistModule
  ],
  declarations: [CoinsComponent],
  providers: [
    CoinsService
  ]
})
export class CoinsModule { }
