import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: 'prize-draw',
    loadComponent: () => import('./pages/prize-draw/prize-draw.component').then((m) => m.PrizeDrawComponent),
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'bag',
    loadComponent: () => import('./pages/bag/bag.component').then((m) => m.BagComponent),
  },
  { path: '**', redirectTo: '' },
];

export const appRoutingProviders = [provideRouter(routes)];
