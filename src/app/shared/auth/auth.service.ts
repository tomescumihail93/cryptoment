import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ng2-cookies';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class AuthService {
  token: string;
  signupURL = 'https://cryptoment-api.mybluemix.net/api/user_models';
  loginURL = 'https://cryptoment-api.mybluemix.net/api/user_models/login';
  constructor(private http: Http, private cookieService: CookieService) { }
  //TODO create model for user signup response
  signupUser(data: Object): Observable<any> {
    //your code for signing up the new user
    // ...using get request
    return this.http.post(this.signupURL, data)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  signinUser(data: Object) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(this.loginURL, data)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  logout() {
    this.token = null;
  }
  getToken() {
    return this.token;
  }
  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
    var token = this.cookieService.get('JWT');
    //this.cookieService.check('JWT')
    return true;
  }
}
