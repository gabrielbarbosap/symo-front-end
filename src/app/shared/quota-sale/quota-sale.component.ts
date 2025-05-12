import { NgClass } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-quota-sale',
  imports: [NgClass],
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

  titulos2 = Array.from({ length: 10 });

  select: Signal<number[]> = signal([]);

  selectTicket(id: any) {
    if (this.select().includes(id)) {
      const remove = this.select().indexOf(id);
      this.select().splice(remove, 1);
    } else {
      this.select().push(id);
    }
    console.log(id);
  }
}
