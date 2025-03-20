import { NgClass, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-quota-sale',
  imports: [NgClass, NgFor],
  templateUrl: './quota-sale.component.html',
  styleUrl: './quota-sale.component.css',
})
export class QuotaSaleComponent {
  totalTitulos = signal(123);
  titulos = Array.from({ length: 123 }, (_, i) => ({
    id: i + 1,
    numero: '04059694',
    ativo: i === 10, // Apenas um item destacado
  }));
}
