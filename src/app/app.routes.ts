import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'node-details/:nodeId',
        loadComponent: () => import('./pages/node-details/node-details.page').then(m => m.NodeDetailsPage)
    },

];
