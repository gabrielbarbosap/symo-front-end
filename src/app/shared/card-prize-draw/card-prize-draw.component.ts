import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { StartQuotasComponent } from '../start-quotas/start-quotas.component';
import { SelectedQuotasComponent } from '../selected-quotas/selected-quotas.component';
import { PurchasedSharesComponent } from '../purchased-shares/purchased-shares.component';
import { NgTemplateOutlet } from '@angular/common';
import { WinnersComponent } from '../winners/winners.component';
import { TagBadgeComponent } from '../tag-badge/tag-badge.component';

@Component({
  selector: 'app-card-prize-draw',
  imports: [
    StartQuotasComponent,
    SelectedQuotasComponent,
    PurchasedSharesComponent,
    WinnersComponent,
    NgTemplateOutlet,
    TagBadgeComponent,
  ],
  templateUrl: './card-prize-draw.component.html',
  styleUrl: './card-prize-draw.component.css',
})
export class CardPrizeDrawComponent implements OnChanges {
  @Input() draw!: any;

  @ViewChild('open', { static: true }) openTemplate!: TemplateRef<any>;
  @ViewChild('participating', { static: true }) participatingTemplate!: TemplateRef<any>;
  @ViewChild('completed', { static: true }) completedTemplate!: TemplateRef<any>;
  @ViewChild('comingSoon', { static: true }) comingSoonTemplate!: TemplateRef<any>;

  currentTemplate!: TemplateRef<any>;

  badges: any = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['draw'] && this.draw?.status) {
      this.selectTemplate(this.draw.status);
      this.tagConfiguration(changes['draw'].currentValue);
    }
  }

  selectTemplate(status?: string): void {
    switch (status) {
      case 'open':
        this.currentTemplate = this.openTemplate;
        break;
      case 'participating':
        this.currentTemplate = this.participatingTemplate;
        break;
      case 'completed':
        this.currentTemplate = this.completedTemplate;
        break;
      case 'comingSoon':
        this.currentTemplate = this.comingSoonTemplate;
        break;
      default:
        this.currentTemplate = this.comingSoonTemplate;
    }
  }

  tagConfiguration(draw: any) {
    const badges: any = [];

    if (draw.badges) {
      // badges.push()
      draw.badges.map((data: any) => {
        badges.push(data);
        console.log(data, 'badges');
      });

      this.badges = badges;
      console.log(badges, 'BADG');
    }

    // console.log(draw,'DRAW');
  }
}
