import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tag-badge',
  imports: [NgStyle],
  templateUrl: './tag-badge.component.html',
  styleUrl: './tag-badge.component.css',
})
export class TagBadgeComponent {
  text = input<string>('');
  color = input<string>('');
  bgColor = input<string>('');
  size = input<string>('');
}
