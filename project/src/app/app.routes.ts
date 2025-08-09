import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './feature/home/home';
import { Register } from './feature/auth/register/register';
import { Login } from './feature/auth/login/login';
import { Create } from './feature/create/create';
import { Details } from './feature/details/details';
import { Profile } from './feature/profile/profile';

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
    },
    {
        path:':userId/profile',
        component:Profile
    }
];
