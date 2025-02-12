import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { PrizeDrawComponent } from './page/prize-draw/prize-draw.component';

export const routes: Routes = [{ path: '', component: PrizeDrawComponent }];

export const appRoutingProviders = [provideRouter(routes)];
