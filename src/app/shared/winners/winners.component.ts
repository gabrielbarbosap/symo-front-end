import { ButtonComponent } from '../button/button.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-winners',
  imports: [ButtonComponent],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.css',
})
export class WinnersComponent {
  @Input() winnerName: string = 'Nome do Vencedor';
  @Input() prizeDescription: string = 'Descrição do prêmio';
  @Input() ticketNumber: string = '000000';
  @Input() imageSrc: string = 'https://via.placeholder.com/50';
}
