import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

import { Coin } from "./metadata/coin";
import { CoinData } from "./metadata/coin-data";

@Injectable()
export class CoinsService {
  private coinList: Coin[];
  private coinMarketCapUrl = 'https://api.coinmarketcap.com/v1/ticker/';  // Add -- ?limit=0 -- to end to get all
  private coinDataUrl = 'https://cryptoment-api.mybluemix.net/api/coinmarketcap_coin_models';
  private coinCheckupUrl = 'https://cryptoment-api.mybluemix.net/api/coincheckup_score_models';

  constructor(private http: Http) { }

  getCoins(): Observable<Coin[]> {
    // ...using get request
    return this.http.get(this.coinMarketCapUrl)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getCoinData(): Observable<any[]> {
    // ...using get request
    return this.http.get(this.coinDataUrl)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  getCoin(id, idc): Observable<any[]> {
      let coinDataCall = this.http.get(this.coinDataUrl + '/' + id);
      let coinCheckupCall = this.http.get(this.coinCheckupUrl + '/' + idc);
      return Observable.forkJoin([
        coinDataCall.map(res => res.json()),
        coinCheckupCall.map(res => res.json())
      ]).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  setCoinList(coinList: Coin[]) {
    this.coinList = coinList;
  }

  getCoinDetails(symbol) {
    return this.coinList.find(coin => coin.symbol = symbol);
  }
}
