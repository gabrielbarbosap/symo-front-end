import { Component } from '@angular/core';
import { WinnersComponent } from '../winners/winners.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-winners-grid',
  imports: [WinnersComponent, ButtonComponent],
  templateUrl: './winners-grid.component.html',
  styleUrl: './winners-grid.component.css',
})
export class WinnersGridComponent {}
