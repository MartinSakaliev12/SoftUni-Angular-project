import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './feature/home/home';
import { Register } from './feature/auth/register/register';
import { Login } from './feature/auth/login/login';
import { Create } from './feature/create/create';
import { Details } from './feature/details/details';
import { Profile } from './feature/profile/profile';
import { guestGuardGuard } from './core/guards/guest-guard-guard';
import { authGuardGuard } from './core/guards/auth-guard-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'home',
        pathMatch:'full'
        
    },
    {
        path:'home',
        loadComponent: () => import('./feature/home/home').then(c => c.Home)
        
    },
    {
        path:'register',
        loadComponent: () => import('./feature/auth/register/register').then(c => c.Register),
        canMatch:[guestGuardGuard]
    },
    {
        path:'login',
        loadComponent: () => import('./feature/auth/login/login').then(c => c.Login),
        canMatch:[guestGuardGuard]        
    },
    {
        path:'createPost',
        loadComponent: () => import('./feature/create/create').then(c => c.Create),
        canMatch:[authGuardGuard]
    },{
        path:':postId/details',
        loadComponent: () => import('./feature/details/details').then(c => c.Details),
        
    },
    {
        path:':userId/profile',
        loadComponent: () => import('./feature/profile/profile').then(c => c.Profile),
        canMatch:[authGuardGuard]
    }
];
