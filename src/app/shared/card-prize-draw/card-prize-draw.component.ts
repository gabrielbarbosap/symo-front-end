import { Component } from '@angular/core';
import { BtnPrizeDrawComponent } from '../btn-prize-draw/btn-prize-draw.component';

@Component({
  selector: 'app-card-prize-draw',
  imports: [BtnPrizeDrawComponent],
  templateUrl: './card-prize-draw.component.html',
  styleUrl: './card-prize-draw.component.css',
})
export class CardPrizeDrawComponent {
  cotasSelecionadas = ['00', '00', '00'];
}
