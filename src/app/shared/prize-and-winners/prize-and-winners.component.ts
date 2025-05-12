import { Component } from '@angular/core';
import { AwardsComponent } from '../awards/awards.component';
import { RankingDailyCardComponent } from '../ranking-daily-card/ranking-daily-card.component';
import { TagBadgeComponent } from '../tag-badge/tag-badge.component';
import { RankingListItemComponent } from '../ranking-list-item/ranking-list-item.component';
import { OtherPrizesComponent } from '../other-prizes/other-prizes.component';
import { HeaderDesckMobaleComponent } from '../header-desck-mobale/header-desck-mobale.component';

@Component({
  selector: 'app-prize-and-winners',
  imports: [
    AwardsComponent,
    AwardsComponent,
    RankingDailyCardComponent,
    TagBadgeComponent,
    RankingListItemComponent,
    HeaderDesckMobaleComponent,
    OtherPrizesComponent,
  ],
  templateUrl: './prize-and-winners.component.html',
  styleUrl: './prize-and-winners.component.css',
})
export class PrizeAndWinnersComponent {
  premios = [
    {
      date: '18/01',
      status: 'PREMIADO',
      winners: [
        { name: 'Bruna S*******', tickets: 32568, prize: 'NISSAN KICKS ACTIVE 0 KM 16V COM RODAS', position: 1 },
        { name: 'Bruna S*******', tickets: 32568, prize: 'NISSAN KICKS ACTIVE 0 KM', position: 2 },
        { name: 'Bruna S*******', tickets: 32568, prize: 'NISSAN KICKS ACTIVE 0 KM', position: 3 },
      ],
    },
    {
      date: '19/01',
      status: 'PREMIADO',
      winners: [
        { name: 'Bruna S*******', tickets: 32568, prize: 'NISSAN KICKS ACTIVE 0 KM', position: 1 },
        { name: 'Bruna S*******', tickets: 32568, prize: 'NISSAN KICKS ACTIVE 0 KM', position: 2 },
        { name: 'Bruna S*******', tickets: 32568, prize: 'NISSAN KICKS ACTIVE 0 KM', position: 3 },
      ],
    },
    {
      date: '20/01',
      status: 'PREMIADO',
      winners: [
        { name: 'Bruna S*******', tickets: 32568, prize: 'NISSAN KICKS ACTIVE 0 KM 16V COM RODAS', position: 1 },
        { name: 'Bruna S*******', tickets: 32568, prize: 'NISSAN KICKS ACTIVE 0 KM', position: 2 },
        { name: 'Bruna S*******', tickets: 32568, prize: 'NISSAN KICKS ACTIVE 0 KM', position: 3 },
      ],
    },
  ];
}
