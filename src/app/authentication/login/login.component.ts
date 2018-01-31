import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ViewChild } from '@angular/core'

import { AuthService } from "../../shared/auth/auth.service";
import { ToastrService } from "../../components/extra/toastr/toastr.service";
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private tostr: ToastrService, 
    private cookieService: CookieService) { }

  ngOnInit() {

  }
  // On submit button click    
  onSubmit() {
    // this.registerForm.reset();
    this.authService.signinUser(this.loginForm.value)
      .subscribe(
      userData => {
        this.router.navigate(['../coins'], { relativeTo: this.route.parent });
        this.cookieService.set( 'JWT', userData);
        this.tostr.typeSuccess('Authenticated');
      },//Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
    this.loginForm.reset();
  }
  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  }
  // On registration link click
  onRegister() {
    this.router.navigate(['./create'], { relativeTo: this.route.parent });
  }
}
