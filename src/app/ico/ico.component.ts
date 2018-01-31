import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IcoService } from "./ico.service";
import { Ico } from "./model/ico";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

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
    this.getLiveIcos();
    this.getUpcomingIcos();
    setTimeout(() => {
      this.getFinishedIcos();
    }, 1000);
  }

    getLiveIcos(){
      this.icoService.getLiveIcos()
          .subscribe(
              (icos: any) => {
                  icos = this.filterEmpty(icos);
                  this.liveIcos = icos;
              }, //Bind to view
              err => {
                  // Log errors if any
                  console.log(err);
              });
    }

    getUpcomingIcos(){
        this.icoService.getUpcomingIcos()
            .subscribe(
                (icos: any) => {
                    icos = this.filterEmpty(icos);
                    this.upcomingIcos = icos;
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log(err);
                });
    }

    getFinishedIcos(){
        this.icoService.getFinishedIcos()
            .subscribe(
                (icos: any) => {
                    icos = this.filterEmpty(icos);
                    this.finishedIcos = icos;
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log(err);
                });

    }

/*
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
*/
  //Filter empty ico properties
  filterEmpty(icos: any) {
    icos.forEach((ico: Ico) => {
      //icoType.forEach(ico => {
        Object.keys(ico).forEach(key => {
          if(ico[key].length === 0) {
            ico[key] = "unknown";
          }
        });
      //});
    });
    return icos;
  }
}
