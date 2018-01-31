import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from "./authentication.component";
import { LoginComponent } from "./login/login.component";
import { CreateComponent } from "./create/create.component";


const routes: Routes = [
  {
    path: '',
     component: AuthenticationComponent,
     children: [
      {path: '', redirectTo: 'login'}, 
      {path: 'login', component: LoginComponent},
      {path: 'create', component: CreateComponent}
    ],
    data: {
      title: 'Authentication'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
