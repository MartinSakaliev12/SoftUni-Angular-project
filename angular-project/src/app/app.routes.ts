import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './feature/home/home';
import { Register } from './feature/register/register';
import { Login } from './feature/login/login';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'home',
        pathMatch:'full'
        
    },
    {
        path:'home',
        component:Home
    },
    {
        path:'register',
        component: Register
    },
    {
        path:'login',
        component:Login
    }
];
