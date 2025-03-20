import { Component } from '@angular/core';
import { AwardsComponent } from '../awards/awards.component';

@Component({
  selector: 'app-prize-and-winners',
  imports: [AwardsComponent, AwardsComponent],
  templateUrl: './prize-and-winners.component.html',
  styleUrl: './prize-and-winners.component.css',
})
export class PrizeAndWinnersComponent {}
