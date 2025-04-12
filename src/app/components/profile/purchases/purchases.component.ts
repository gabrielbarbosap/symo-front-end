import { Component } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

interface Titulo {
  numero: string;
  selecionado: boolean;
}

interface SorteioDetalhe {
  nome: string;
  data: string;
  hora: string;
  imagemUrl: string;
  status: 'ABERTO' | 'CONCLUÍDO';
  detalhesPagamento: {
    subtotalItens: number;
    pixMilhao: number;
    taxaEntrega: number;
    desconto: number;
    total: number;
  };
  formaPagamento: string;
  comprador: {
    nome: string;
    telefone: string;
    celular: string;
    cpf: string;
  };
  titulos: Titulo[];
  cotasDisponiveis?: number;
  premioPrincipal?: string;
  outrosPremios?: string[];
  ganhou?: boolean;
}

interface Compra {
  numeroCompra: string;
  dataCompra: string;
  sorteios: SorteioDetalhe[];
  expanded: boolean;
}

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CurrencyPipe, NgIf, NgFor],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css',
})
export class PurchasesComponent {
  maskLast6Digits(number: string) {
    if (!number) return '';

    const digitsOnly = number.replace(/\D/g, '');
    const visiblePart = digitsOnly.slice(0, -6);
    const maskedPart = '*'.repeat(6);

    return visiblePart + maskedPart;
  }
  comprasRealizadasGeral: Compra[] = [
    {
      numeroCompra: '99439583922332',
      dataCompra: '12/12/2024 12:23',
      expanded: true,
      sorteios: [
        {
          nome: 'Pix do Milhão',
          data: '16/12/2024',
          hora: '19:00',
          imagemUrl: 'assets/card_sorteio.svg',
          status: 'CONCLUÍDO',
          detalhesPagamento: {
            subtotalItens: 2014.95,
            pixMilhao: 123.0,
            taxaEntrega: 0,
            desconto: 0,
            total: 1014.95,
          },
          formaPagamento: 'PIX',
          comprador: {
            nome: 'Rafael Oliveira Santos',
            telefone: '(81) 9999-9999',
            celular: '(81) 9999-9999',
            cpf: '11555666478',
          },
          titulos: [
            { numero: '04050564', selecionado: true },
            { numero: '04053694', selecionado: true },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
          ],
          ganhou: true,
          premioPrincipal: 'MOTO HONDA 2025 0KM COM CAPACETE 345 CILINDRADAS',
          outrosPremios: ['04059694'],
        },
        {
          nome: 'Pix do Milhão',
          data: '12/12/2024',
          hora: '19:00',
          imagemUrl: 'assets/card_sorteio.svg',
          status: 'CONCLUÍDO',
          detalhesPagamento: {
            subtotalItens: 123.0,
            pixMilhao: 0,
            taxaEntrega: 0,
            desconto: 0,
            total: 123.0,
          },
          formaPagamento: 'PIX',
          comprador: {
            nome: 'Rafael Oliveira Santos',
            telefone: '(81) 9999-9999',
            celular: '(81) 9999-9999',
            cpf: '11555666478',
          },
          titulos: [
            { numero: '04059694', selecionado: true },
            { numero: '04053694', selecionado: true },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
            { numero: '04053694', selecionado: false },
            { numero: '04050564', selecionado: false },
          ],
          ganhou: false,
        },
      ],
    },
  ];
}
