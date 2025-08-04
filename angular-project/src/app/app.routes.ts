import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './feature/home/home';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'home',
        pathMatch:'full'
        
    },
    {
        path:'home',
        component:Home
    }
];
