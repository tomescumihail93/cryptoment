import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

import { Coin } from "./metadata/coin";

@Injectable()
export class CoinsService {
  private coinList: Coin[];
  private coinMarketCapUrl = 'https://api.coinmarketcap.com/v1/ticker/';  // Add -- ?limit=0 -- to end to get all

  constructor(private http: Http) { }

  getCoins(): Observable<Coin[]> {
    // ...using get request
    return this.http.get(this.coinMarketCapUrl)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getCoin(id): Observable<Coin[]> {
    // ...using get request
    return this.http.get(this.coinMarketCapUrl+id+'/')
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  setCoinList(coinList: Coin[]) {
    this.coinList = coinList;
  }

  getCoinDetails(symbol) {
    return this.coinList.find(coin => coin.symbol = symbol);
  }
}
