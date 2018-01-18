import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IcoComponent } from "./ico.component";

const routes: Routes = [
  {
    path: '',
     component: IcoComponent,
    data: {
      title: 'ICO'
    },
    
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcoRoutingModule { }
