import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { LoteryService } from '../../../services/lotery.service';

interface Cartela {
  cartela: string;
  numeros: string[];
}

interface Compra {
  numeroCompra: string;
  dataCompra: string;
  valorTotal: number;
  cartelas: Cartela[];
  formaPagamento: string;
  comprador: {
    nome: string;
    telefone: string;
    cpf: string;
  };
  imagemRifa: string;
  nomeRifa: string;
  statusRifa: 'aberto' | 'finalizado' | string;
  expanded: boolean;
}

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CurrencyPipe, NgIf, NgFor, NgClass, UpperCasePipe],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css',
})
export class PurchasesComponent implements OnInit {
  private loteryService = inject(LoteryService);
  comprasRealizadasGeral: Compra[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.isLoading = true;

    this.loteryService.getQuotasUser().subscribe({
      next: (res: any) => {
        const data = res.data;

        this.comprasRealizadasGeral = data.map((item: any) => ({
          numeroCompra: item.id.toString(),
          dataCompra: new Date(item.createdAt).toLocaleString('pt-BR'),
          valorTotal: parseFloat(item.valorTotal),
          formaPagamento: 'Pix',
          comprador: {
            nome: item.user?.nome || 'Não informado',
            telefone: item.user?.celular || '',
            cpf: item.user?.cpf || '',
          },
          imagemRifa: item.rifa?.imagens?.[0]?.img || 'assets/card_sorteio.svg',
          nomeRifa: item.rifa?.descricao || 'Sorteio',
          statusRifa: item.rifa?.status?.toLowerCase() || 'desconhecido',
          cartelas: item.cartelas.map((cartela: any) => ({
            cartela: cartela.cartela,
            numeros: cartela.numeros,
          })),
          expanded: false,
        }));

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar compras', err);
        this.isLoading = false;
      },
    });
  }

  maskLast6Digits(value: string): string {
    if (!value) return '';
    const digitsOnly = value.replace(/\D/g, '');
    const visiblePart = digitsOnly.slice(0, -6);
    const maskedPart = '*'.repeat(6);
    return visiblePart + maskedPart;
  }
}
