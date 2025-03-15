import { Component } from '@angular/core';
import { SweepstakesGridComponent } from '../../shared/sweepstakes-grid/sweepstakes-grid.component';
import { WinnersGridComponent } from '../../shared/winners-grid/winners-grid.component';
import { HeroComponent } from '../../shared/hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [SweepstakesGridComponent, WinnersGridComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
