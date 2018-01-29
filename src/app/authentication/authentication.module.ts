import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { AuthService } from "../shared/auth/auth.service";
import { ToastrService } from "../components/extra/toastr/toastr.service";

import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule
  ],
  declarations: [LoginComponent, CreateComponent, AuthenticationComponent],
  providers: [
    AuthService,
    ToastrService
  ]
})
export class AuthenticationModule { }
