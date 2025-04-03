import { Component, Input } from '@angular/core';
import { BtnPrizeDrawComponent } from '../btn-prize-draw/btn-prize-draw.component';

@Component({
  selector: 'app-header-desck-mobale',
  templateUrl: './header-desck-mobale.component.html',
  styleUrls: ['./header-desck-mobale.component.css'],
  imports: [BtnPrizeDrawComponent],
})
export class HeaderDesckMobaleComponent {
  @Input() headerText = '';
  constructor() {}
}
