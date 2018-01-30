import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

import { Ico } from "./model/ico";

@Injectable()
export class IcoService {
  private liveIcosUrl = 'https://cryptoment-api.mybluemix.net/api/icowatchlist_live_models';
  private upcomingIcosUrl = "https://cryptoment-api.mybluemix.net/api/icowatchlist_upcoming_models";
  private finishedIcosUrl = "https://cryptoment-api.mybluemix.net/api/icowatchlist_finished_models";

  constructor(private http: Http) { }

  getLiveIcos(): Observable<Ico[]> {
      return this.http.get(this.liveIcosUrl).map(res => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getUpcomingIcos(): Observable<Ico[]> {
      return this.http.get(this.upcomingIcosUrl).map(res => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getFinishedIcos(): Observable<Ico[]> {
      return this.http.get(this.finishedIcosUrl).map(res => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  /*
  getIcos(): Observable<Ico[]> {
    let liveIcosCall = this.http.get(this.liveIcosUrl);
    let upcomingIcosCall = this.http.get(this.upcomingIcosUrl);
    let finishedIcosUrl = this.http.get(this.finishedIcosUrl);

    return Observable.forkJoin([

      liveIcosCall.map(res => res.json()),
      upcomingIcosCall.map(res => res.json()),
      finishedIcosUrl.map(res => res.json())
    ]).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // // ...using get request
    // return this.http.get(this.liveIcosUrl)
    //   // ...and calling .json() on the response to return data
    //   .map((res: Response) => res.json())
    //   //...errors if any
  }
  */

}
