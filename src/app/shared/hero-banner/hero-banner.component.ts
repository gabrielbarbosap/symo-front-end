import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { QuotaService } from '../../services/quota.service';
import { QuotaSelectionComponent } from '../quota-selection/quota-selection.component';
import { ProgressComponent } from '../progress/progress.component';
import { ButtonComponent } from '../button/button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTicket } from '@ng-icons/bootstrap-icons';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, QuotaSelectionComponent, ProgressComponent, ButtonComponent, NgIcon],
  viewProviders: [
    provideIcons({
      bootstrapTicket,
    }),
  ],
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css'],
})
export class HeroBannerComponent implements OnInit {
  @Input() title: string = 'Caroço da Sorte: 3.000,00 Reais no seu bolso';
  @Input() edition: string = 'EDIÇÃO 01';
  @Input() date: string = '17/05/2025 – 19:00 ';
  @Input() price: number = 3;
  @Input() soldPercentage: number = 75;
  @Input() daysLeft: number = 12;
  @Input() hours: number = 12;
  @Input() minutes: number = 34;
  @Input() seconds: number = 3;

  @Input()
  uuid!: string; // Identificação do sorteio

  private _selectedQuotes: number = 0;
  options: number[] = [100, 200, 300, 400];

  constructor(
    private quotaService: QuotaService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.quotaService.getQuotaState$(this.uuid).subscribe((state) => {
      this.selectedQuotes = state.selectedQuotes;
    });
  }

  get selectedQuotes(): number {
    return this._selectedQuotes;
  }

  set selectedQuotes(value: number) {
    this._selectedQuotes = Math.round(value);
  }

  get totalPrice(): number {
    return this.selectedQuotes * this.price;
  }

  openSelection(): void {
    if (this.selectedQuotes === 0) {
      this.selectedQuotes = 1;
    }
  }

  addQuotes(amount: number): void {
    const newQuotes = this.selectedQuotes + amount;
    this.quotaService.updateSelectedQuotes(this.uuid, newQuotes);
  }

  increaseQuotes(): void {
    const newQuotes = Math.min(10000, this.selectedQuotes + 1);
    this.quotaService.updateSelectedQuotes(this.uuid, newQuotes);
  }

  decreaseQuotes(): void {
    const newQuotes = Math.max(1, this.selectedQuotes - 1);
    this.quotaService.updateSelectedQuotes(this.uuid, newQuotes);
  }
}
