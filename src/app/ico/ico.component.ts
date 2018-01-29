import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IcoService } from "./ico.service";
import { Ico } from "./model/ico";

@Component({
  selector: 'app-ico',
  templateUrl: './ico.component.html',
  styleUrls: ['./ico.component.scss']
})
export class IcoComponent implements OnInit {
  public liveIcos: Ico;
  public upcomingIcos: Ico;
  public finishedIcos: Ico;

  constructor(private icoService: IcoService) { }

  ngOnInit() {
    this.getCoins();
  }

  getCoins() {
    // Get all comments
    this.icoService.getIcos()
    .subscribe(
        (icos: any[]) => {
          icos = this.filterEmpty(icos);
          this.liveIcos = icos[0];
          this.upcomingIcos = icos[1];
          this.finishedIcos = icos[2];
        }, //Bind to view
         err => {
             // Log errors if any
             console.log(err);
         });
  }

  //Filter empty ico properties
  filterEmpty(icos: any[]) {
    icos.forEach((icoType: Ico[]) => {
      icoType.forEach(ico => {
        Object.keys(ico).forEach(key => {
          if(ico[key].length === 0) {
            ico[key] = "unknown";
          }
        });
      });
    })
    return icos;
  }
}
