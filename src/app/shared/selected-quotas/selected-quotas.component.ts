import { Component } from '@angular/core';
import { BtnPrizeDrawComponent } from '../btn-prize-draw/btn-prize-draw.component';

@Component({
  selector: 'app-selected-quotas',
  imports: [BtnPrizeDrawComponent],
  templateUrl: './selected-quotas.component.html',
  styleUrl: './selected-quotas.component.css',
})
export class SelectedQuotasComponent {
  quotasSelected: string[] = ['00', '00', '2', '00', '00', '00', '00', '00', '00'];

  removeQuota(index: number): void {
    this.quotasSelected.splice(index, 1);
  }

  showQuotas(): void {
    console.log('Mostrar cotas selecionadas:', this.quotasSelected);
  }
}
