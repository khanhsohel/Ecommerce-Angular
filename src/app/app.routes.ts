import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', loadChildren: () => import('../app/Auth/auth-module').then(m => m.AuthModule) },
];
