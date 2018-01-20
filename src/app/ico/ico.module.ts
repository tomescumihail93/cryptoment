import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

import { IcoRoutingModule } from './ico-routing.module';
import { IcoComponent } from './ico.component';
import { IcoService } from "./ico.service";

@NgModule({
  imports: [
    CommonModule,
    IcoRoutingModule,
    NgbModule,
    HttpModule
  ],
  declarations: [IcoComponent],
  providers: [
    IcoService
  ]
})
export class IcoModule { }
