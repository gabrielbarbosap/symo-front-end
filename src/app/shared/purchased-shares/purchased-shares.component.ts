import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { BtnPrizeDrawComponent } from '../btn-prize-draw/btn-prize-draw.component';

@Component({
  selector: 'app-purchased-shares',
  imports: [NgFor, FormsModule, DecimalPipe, BtnPrizeDrawComponent],
  templateUrl: './purchased-shares.component.html',
  styleUrl: './purchased-shares.component.css',
})
export class PurchasedSharesComponent {
  amount: number = 100;
  priceBase: number = 9.65;
  quotasAvailable: number[] = [200, 200, 200, 200, 200, 200];
  options: number[] = [10, 20, 50, 100, 200];
  extraquotas = [10, 20, 50, 100];
  quotasSelected = 100;
  price = 232.29;

  get priceTotal(): number {
    return this.amount * this.priceBase;
  }

  addQuota(valor: number): void {
    this.amount += valor;
  }

  increaseQuantity() {
    this.amount += 50;
    this.updatePrice();
  }

  decreaseQuantity() {
    if (this.amount > 50) {
      this.amount -= 50;
      this.updatePrice();
    }
  }

  updatePrice() {
    this.price = (this.amount / 500) * 232.29;
  }

  increase() {
    this.amount += 50;
  }

  diminuir() {
    if (this.amount > 50) {
      this.amount -= 50;
    }
  }

  updateValue(event: Event) {
    this.amount = Number((event.target as HTMLInputElement).value);
  }

  selectQuotas(valor: number) {
    this.quotasSelected = valor;
  }
}
