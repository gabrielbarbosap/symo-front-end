import { Component } from '@angular/core';
import { QuotaSelectionComponent } from '../quota-selection/quota-selection.component';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';
import { ProgressComponent } from '../progress/progress.component';

@Component({
  selector: 'app-sweepstakes',
  imports: [QuotaSelectionComponent, CountdownTimerComponent, ProgressComponent],
  templateUrl: './sweepstakes.component.html',
  styleUrl: './sweepstakes.component.css',
})
export class SweepstakesComponent {
  onCountdownEnd() {
    console.log('O countdown chegou ao fim!');
    // Aqui você pode adicionar alguma ação, como redirecionamento ou exibir uma mensagem.
  }
}
