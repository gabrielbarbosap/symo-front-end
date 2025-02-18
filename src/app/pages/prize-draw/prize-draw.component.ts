import { Component } from '@angular/core';
import { HeaderPrizeDrawComponent } from '../../shared/header-prize-draw/header-prize-draw.component';
import { CardPrizeDrawComponent } from '../../shared/card-prize-draw/card-prize-draw.component';

@Component({
  selector: 'app-prize-draw',
  imports: [HeaderPrizeDrawComponent, CardPrizeDrawComponent],
  templateUrl: './prize-draw.component.html',
  styleUrl: './prize-draw.component.css',
})
export class PrizeDrawComponent {
  cards = [0, 1, 2, 3, 4, 5, 6];
}
