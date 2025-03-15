import { InjectionToken } from '@angular/core';
import { Environment } from './environment.model';
import { environment } from './environment';

export const ENVIRONMENT = new InjectionToken<Environment>('environment', {
  providedIn: 'root',
  factory: () => environment,
});
