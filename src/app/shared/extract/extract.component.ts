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
    { tipo: 'comissao', descricao: 'Recebimento de comissão', valor: 500 },
    { tipo: 'premio', descricao: 'Bônus de desempenho', valor: 1000 },
    { tipo: 'saque', descricao: 'Saque bancário', valor: -200 },
    { tipo: 'compra', descricao: 'Compra no marketplace', valor: -150 },
    { tipo: 'deposito', descricao: 'Depósito na conta', valor: 300 },
  ];
}
