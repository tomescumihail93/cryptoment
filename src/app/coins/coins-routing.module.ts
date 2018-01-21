import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinsComponent } from "./coins.component";
import { ListComponent } from "./list/list.component";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
  {
    path: '',
     component: CoinsComponent,
     children: [
      {path: '', redirectTo: 'list'}, 
      {path: 'list', component: ListComponent},
      {path: 'details/:id', component: DetailsComponent}
    ],
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
