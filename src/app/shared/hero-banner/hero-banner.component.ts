import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgpSlider, NgpSliderTrack, NgpSliderRange, NgpSliderThumb } from 'ng-primitives/slider';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgpSlider, NgpSliderTrack, NgpSliderRange, NgpSliderThumb],
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css'],
})
export class HeroBannerComponent {
  @Input() title: string = 'Pix do Milhão e mais de milhão';
  @Input() edition: string = 'Edição 01';
  @Input() date: string = '12/12/2024 - 19:30';
  @Input() price: number = 2.29;
  @Input() soldPercentage: number = 75;
  @Input() daysLeft: number = 12;
  @Input() hours: number = 12;
  @Input() minutes: number = 34;
  @Input() seconds: number = 3;

  // Usando getter e setter para garantir valor inteiro
  private _selectedQuotes: number = 1;
  get selectedQuotes(): number {
    return this._selectedQuotes;
  }
  set selectedQuotes(value: number) {
    this._selectedQuotes = Math.round(value);
  }

  options: number[] = [100, 200, 300, 400];

  // Calcula o preço total baseado nas cotas selecionadas
  get totalPrice(): number {
    return this.selectedQuotes * this.price;
  }

  // Define uma cota inicial quando o usuário abre a seleção
  openSelection(): void {
    if (this.selectedQuotes === 0) {
      this.selectedQuotes = 1;
    }
  }

  // Adiciona cotas ao total selecionado
  addQuotes(amount: number): void {
    this.selectedQuotes = this.selectedQuotes + amount;
  }

  // Aumenta a quantidade do slider, limitando o máximo
  increaseQuotes(): void {
    this.selectedQuotes = Math.min(10000, this.selectedQuotes + 1);
  }

  // Diminui a quantidade do slider, impedindo valores negativos
  decreaseQuotes(): void {
    this.selectedQuotes = Math.max(1, this.selectedQuotes - 1);
  }
}
