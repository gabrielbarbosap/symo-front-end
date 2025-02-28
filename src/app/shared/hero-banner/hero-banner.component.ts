import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { QuotaService } from '../../services/quota.service';
import { QuotaSelectionComponent } from '../quota-selection/quota-selection.component';
import { ProgressComponent } from '../progress/progress.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, QuotaSelectionComponent, ProgressComponent, ButtonComponent],
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css'],
})
export class HeroBannerComponent implements OnInit {
  @Input() title: string = 'Pix do Milhão e mais de milhão';
  @Input() edition: string = 'Edição 01';
  @Input() date: string = '12/12/2024 - 19:30';
  @Input() price: number = 2.29;
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
