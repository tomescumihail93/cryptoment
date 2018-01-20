import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IcoService } from "./ico.service";
import { Coin } from "./model/coin";

@Component({
  selector: 'app-ico',
  templateUrl: './ico.component.html',
  styleUrls: ['./ico.component.scss']
})
export class IcoComponent implements OnInit {
  public coins: Coin[];

  constructor(private icoService: IcoService) { }

  ngOnInit() {
    this.getCoins();
  }

  getCoins() {
    // Get all comments
    this.icoService.getCoins()
    .subscribe(
        coins => this.coins = coins, //Bind to view
         err => {
             // Log errors if any
             console.log(err);
         });
  }
}
