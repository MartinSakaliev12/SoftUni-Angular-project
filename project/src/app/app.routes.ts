import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './feature/home/home';
import { Register } from './feature/auth/register/register';
import { Login } from './feature/auth/login/login';
import { Create } from './feature/create/create';
import { Details } from './feature/details/details';

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
    },
    {
        path:'createPost',
        component:Create
    },{
        path:':postId/details',
        component:Details
    }
];
