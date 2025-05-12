import { Component } from '@angular/core';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';

export interface Transacao {
  id: number;
  tipo: 'comissao' | 'premio' | 'saque' | 'compra' | 'deposito';
  descricao: string;
  valor: number;
  data: string;
  status?: 'processando' | 'concluido';
}
@Component({
  selector: 'app-extract',
  imports: [TransactionListComponent],
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss'],
})
export class ExtractComponent {
  transacoes = [
    { tipo: 'comissao', descricao: 'Comissão liberada', valor: 500 },
    { tipo: 'premio', descricao: 'Prêmio recebido', valor: 1000 },
    { tipo: 'saque', descricao: 'Saque de valor - PIX', valor: -200, status: 'processando' },
    { tipo: 'compra', descricao: 'Compra no marketplace', valor: -150 },
    { tipo: 'deposito', descricao: 'Depósito na conta', valor: 300 },
  ];
}
