import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Login } from './Login/login';
import { Signup } from './Signup/signup';

export const routes: Routes = [

  // { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup},

];  

@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class authsignLogin{ }    


