import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './feature/home/home';
import { Register } from './feature/auth/register/register';
import { Login } from './feature/auth/login/login';

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
