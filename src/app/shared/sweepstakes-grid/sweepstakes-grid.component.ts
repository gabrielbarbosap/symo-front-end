import { Component } from '@angular/core';
import { SweepstakesComponent } from '../sweepstakes/sweepstakes.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-sweepstakes-grid',
  imports: [SweepstakesComponent, ButtonComponent],
  templateUrl: './sweepstakes-grid.component.html',
  styleUrl: './sweepstakes-grid.component.css',
})
export class SweepstakesGridComponent {}
