import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinsComponent } from "./coins.component";

const routes: Routes = [
  {
    path: '',
     component: CoinsComponent,
    data: {
      title: 'Coins'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsRoutingModule { }
