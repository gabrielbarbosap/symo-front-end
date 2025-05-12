import { Component, Input } from '@angular/core';
import { TagBadgeComponent } from '../tag-badge/tag-badge.component';

@Component({
  selector: 'app-ranking-daily-card',
  imports: [TagBadgeComponent],
  templateUrl: './ranking-daily-card.component.html',
  styleUrl: './ranking-daily-card.component.css',
})
export class RankingDailyCardComponent {
  @Input() data!: {
    date: string;
    status: string;
    winners: {
      name: string;
      tickets: number;
      prize: string;
      position: number;
    }[];
  };
}
