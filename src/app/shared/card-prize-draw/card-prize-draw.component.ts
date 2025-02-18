import { Component } from '@angular/core';
import { StartQuotasComponent } from '../start-quotas/start-quotas.component';
import { SelectedQuotasComponent } from '../selected-quotas/selected-quotas.component';

@Component({
  selector: 'app-card-prize-draw',
  imports: [StartQuotasComponent, SelectedQuotasComponent],
  templateUrl: './card-prize-draw.component.html',
  styleUrl: './card-prize-draw.component.css',
})
export class CardPrizeDrawComponent {
  cotasSelecionadas = ['00', '00', '00'];
}
