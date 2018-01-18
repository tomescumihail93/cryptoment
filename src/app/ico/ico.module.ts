import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IcoRoutingModule } from './ico-routing.module';
import { IcoComponent } from './ico.component';

@NgModule({
  imports: [
    CommonModule,
    IcoRoutingModule,
    NgbModule
  ],
  declarations: [IcoComponent]
})
export class IcoModule { }
