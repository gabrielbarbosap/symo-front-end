import { Component, Input } from '@angular/core';
import { BtnPrizeDrawComponent } from '../btn-prize-draw/btn-prize-draw.component';

@Component({
  selector: 'app-winners',
  imports: [BtnPrizeDrawComponent],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.css',
})
export class WinnersComponent {
  @Input() winnerName: string = 'Nome do Vencedor';
  @Input() prizeDescription: string = 'Descrição do prêmio';
  @Input() ticketNumber: string = '000000';
  @Input() imageSrc: string = 'https://via.placeholder.com/50';
}
