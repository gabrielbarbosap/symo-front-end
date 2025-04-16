import { Component, Input, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { QuotaService } from '../../services/quota.service';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTicket } from '@ng-icons/bootstrap-icons';

@Component({
  imports: [NgIf, NgFor, ButtonComponent, NgClass, FormsModule, CurrencyPipe, NgIcon],
  viewProviders: [
    provideIcons({
      bootstrapTicket,
    }),
  ],
  selector: 'app-quota-selection',
  templateUrl: './quota-selection.component.html',
  styleUrls: ['./quota-selection.component.css'],
})
export class QuotaSelectionComponent implements OnInit {
  @Input() context: 'hero' | 'card' = 'hero';
  @Input() isMobile: boolean = false;

  selectedQuotes: number = 0;
  totalPrice: number = 0;
  progress: number = 0;
  uuid: string = '';
  quotas: any = [1, 2, 3, 5, 10, 20];
  showAdvanced = false;

  constructor(private quotaService: QuotaService) {}

  private generateUUID(): void {
    this.uuid = uuidv4();
  }

  ngOnInit(): void {
    this.showAdvanced = this.isMobile;
    this.generateUUID();
    this.quotaService.getQuotaState$(this.uuid).subscribe((state) => {
      this.selectedQuotes = state.selectedQuotes;
      this.totalPrice = state.totalPrice;
      this.progress = state.progress;
    });
  }

  selectQuota(amount: number): void {
    this.selectedQuotes += amount;
    this.showAdvanced = true;
    this.updateQuotaState();
  }

  resetSelection(): void {
    this.selectedQuotes = 0;
    this.updateQuotaState();
  }

  public updateQuotaState(): void {
    this.quotaService.updateSelectedQuotes(this.uuid, this.selectedQuotes);
  }

  increaseQuantity(): void {
    this.selectedQuotes++;
    this.updateQuotaState();
  }

  decreaseQuantity(): void {
    if (this.selectedQuotes > 0) {
      this.selectedQuotes--;
      this.updateQuotaState();
    }
  }
}
