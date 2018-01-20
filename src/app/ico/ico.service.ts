import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

import { Coin } from "./model/coin";

@Injectable()
export class IcoService {
  private coinMarketCapUrl = 'https://api.coinmarketcap.com/v1/ticker/';

  constructor(private http: Http) { }

  getCoins(): Observable<Coin[]> {
    // ...using get request
    return this.http.get(this.coinMarketCapUrl)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

}
