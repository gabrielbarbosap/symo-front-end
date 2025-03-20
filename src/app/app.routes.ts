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
    path: 'quota-sale',
    loadComponent: () =>
      import('./pages/quota-sale-page/quota-sale-page.component').then((m) => m.QuotaSalePageComponent),
  },
  { path: '**', redirectTo: '' },
];

export const appRoutingProviders = [provideRouter(routes)];
