import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "../../shared/auth/auth.service";
import { ToastrService } from "../../components/extra/toastr/toastr.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  // @ViewChild('f') registerForm: NgForm;
  constructor(private authService: AuthService, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService) { }
  ngOnInit() {

  }

  //  On submit click, reset field value
  onSubmit(form: NgForm) {
    // this.registerForm.reset();
    this.authService.signupUser(form.value)
      .subscribe(
      userData => {
        this.router.navigate(['./login'], { relativeTo: this.route.parent });
        this.toastr.typeSuccess('Registered');
      },//Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }

}
