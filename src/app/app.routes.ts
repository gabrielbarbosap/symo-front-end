import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: 'prize-draw',
    loadComponent: () => import('./pages/prize-draw/prize-draw.component').then((m) => m.PrizeDrawComponent),
  },
  { path: '**', redirectTo: '' },
];

export const appRoutingProviders = [provideRouter(routes)];
