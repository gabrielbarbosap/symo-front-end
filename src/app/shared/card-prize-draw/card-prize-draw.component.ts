import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { StartQuotasComponent } from '../start-quotas/start-quotas.component';
import { SelectedQuotasComponent } from '../selected-quotas/selected-quotas.component';
import { PurchasedSharesComponent } from '../purchased-shares/purchased-shares.component';
import { NgTemplateOutlet } from '@angular/common';
import { WinnersComponent } from '../winners/winners.component';
import { CountDownComponent } from '../count-down/count-down.component';

@Component({
  selector: 'app-card-prize-draw',
  imports: [
    StartQuotasComponent,
    SelectedQuotasComponent,
    PurchasedSharesComponent,
    WinnersComponent,
    NgTemplateOutlet,
    CountDownComponent,
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['draw'] && this.draw?.status) {
      this.selectTemplate(this.draw.status);
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
}
