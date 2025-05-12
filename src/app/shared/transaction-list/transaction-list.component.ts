import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  imports: [NgFor, NgIf, CurrencyPipe],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
})
export class TransactionListComponent {
  @Input() transacoes: { tipo: string; descricao: string; valor: number; status?: string }[] = [];
}
