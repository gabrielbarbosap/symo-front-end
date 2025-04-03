import { Component, Input } from '@angular/core';
import { TagBadgeComponent } from '../tag-badge/tag-badge.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-other-prizes',
  templateUrl: './other-prizes.component.html',
  styleUrls: ['./other-prizes.component.css'],
  imports: [TagBadgeComponent, NgClass],
})
export class OtherPrizesComponent {
  @Input() isbgPurple = false;
  @Input() isTag = false;
  constructor() {}
}
