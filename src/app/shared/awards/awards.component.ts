import { Component, Input } from '@angular/core';
import { BtnPrizeDrawComponent } from '../btn-prize-draw/btn-prize-draw.component';
import { TagBadgeComponent } from '../tag-badge/tag-badge.component';

@Component({
  selector: 'app-awards',
  imports: [BtnPrizeDrawComponent, TagBadgeComponent],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.css',
})
export class AwardsComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() position!: string;
}
