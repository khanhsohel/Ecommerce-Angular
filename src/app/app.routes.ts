import { Routes } from '@angular/router';
import { Home } from './ecommerce-pages/home/home';

export const routes: Routes = [


    {path:'',component:Home},
    { path: '', loadChildren: () => import('../app/Auth/auth-module').then(m => m.AuthModule) },
];
