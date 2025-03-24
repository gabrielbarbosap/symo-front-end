import { Component, signal } from '@angular/core';
import { NgpTabset, NgpTabList, NgpTabButton, NgpTabPanel } from 'ng-primitives/tabs';
import { QuotaSaleComponent } from '../../shared/quota-sale/quota-sale.component';
import { PrizeAndWinnersComponent } from '../../shared/prize-and-winners/prize-and-winners.component';
import { RegulationComponent } from '../../shared/regulation/regulation.component';

type Tab = 'overview' | 'features' | 'pricing';

@Component({
  selector: 'app-quota-sale-page',
  imports: [
    NgpTabset,
    NgpTabList,
    NgpTabButton,
    NgpTabPanel,
    QuotaSaleComponent,
    PrizeAndWinnersComponent,
    RegulationComponent,
  ],
  templateUrl: './quota-sale-page.component.html',
  styleUrl: './quota-sale-page.component.css',
})
export class QuotaSalePageComponent {
  readonly selectedTab = signal<Tab>('overview');
}
