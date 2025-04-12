import { Component } from '@angular/core';
import { QuotaSelectionComponent } from '../quota-selection/quota-selection.component';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';

@Component({
  selector: 'app-sweepstakes',
  imports: [QuotaSelectionComponent, CountdownTimerComponent],
  templateUrl: './sweepstakes.component.html',
  styleUrl: './sweepstakes.component.css',
})
export class SweepstakesComponent {
  onCountdownEnd() {
    console.log('O countdown chegou ao fim!');
    // Aqui você pode adicionar alguma ação, como redirecionamento ou exibir uma mensagem.
  }
}
