import { Component } from '@angular/core';
import { TagBadgeComponent } from '../tag-badge/tag-badge.component';

@Component({
  selector: 'app-ranking-list-item',
  imports: [TagBadgeComponent],
  templateUrl: './ranking-list-item.component.html',
  styleUrl: './ranking-list-item.component.css',
})
export class RankingListItemComponent {}
