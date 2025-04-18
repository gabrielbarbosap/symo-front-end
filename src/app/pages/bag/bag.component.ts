import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LoteryItem, LoteryService } from '../../services/lotery.service';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { NgpProgress, NgpProgressIndicator } from 'ng-primitives/progress';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule, QRCodeComponent, NgpProgress, NgpProgressIndicator],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css',
})
export class BagComponent implements OnInit {
  lotery!: LoteryItem;
  date = '';
  items: any[] = [];
  subtotal = 0;
  total = 0;

  pixQrCodeUrl = '';
  pixCode = '';

  minutes = 5;
  seconds = 0;
  interval: any;
  showPix = false;
  pedidoId = 0;

  progress = 100;
  countdownTotalSeconds = 0;
  elapsedSeconds = 0;

  qntInit: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loteryService: LoteryService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const quantidade = parseInt(params['quantidade'], 10) || 100;
      const pedidoId = parseInt(params['pedido'], 10); // <- aqui você pega o ID do pedido

      this.qntInit = quantidade;

      const stored = sessionStorage.getItem('loteryData');
      if (stored) {
        this.lotery = JSON.parse(stored);
        this.date = this.formatDate(this.lotery.dataSorteio || '');
      }

      this.items = [
        {
          name: this.lotery.descricao,
          quantity: quantidade,
          total: quantidade * this.lotery.valor,
        },
      ];

      this.calculateTotals();
      this.startCountdown();

      console.log('ID do pedido:', pedidoId);
      this.pedidoId = pedidoId;
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
      ' - ' +
      date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    );
  }

  increase(item: any) {
    console.log(item);
    item.quantity++;
    item.total = item.quantity * this.lotery.valor;
    this.calculateTotals();
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      item.total = item.quantity * this.lotery.valor;
      this.calculateTotals();
    }
  }

  getTotalItems(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  calculateTotals() {
    this.subtotal = this.items.reduce((sum, i) => sum + i.total, 0);
    this.total = this.subtotal;
  }

  startCountdown(minutes: number = 3) {
    // Tempo total em segundos
    const totalSeconds = minutes * 60;
    let secondsLeft = totalSeconds;

    this.progress = 100;
    this.minutes = Math.floor(secondsLeft / 60);
    this.seconds = secondsLeft % 60;

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      secondsLeft--;

      // Atualiza tempo
      this.minutes = Math.floor(secondsLeft / 60);
      this.seconds = secondsLeft % 60;

      // Atualiza progresso (%)
      this.progress = (secondsLeft / totalSeconds) * 100;

      if (secondsLeft <= 0) {
        clearInterval(this.interval);
        this.progress = 0;
      }
    }, 1000);
  }

  initPayment() {
    const currentQuantity = this.items[0]?.quantity;
    console.log(currentQuantity);

    if (this.qntInit === currentQuantity) {
      this.startPix();
    } else {
      this.loteryService.updateOrder(this.pedidoId, currentQuantity).subscribe({
        next: (res) => {
          console.log('Pedido atualizado com sucesso', res);
          this.startPix();
        },
        error: (err) => {
          console.error('Erro ao atualizar pedido', err);
        },
      });
    }
  }

  startPix() {
    this.loteryService.getQrCode(this.lotery.id, this.pedidoId).subscribe({
      next: (response: any) => {
        console.log('QR Code recebido:', response);
        this.pixCode = response.pixCopiaECola;
        this.pixQrCodeUrl = response.location; // para usar no QRCode

        this.showPix = true;
        this.minutes = 2;
        this.seconds = 0;
        this.startCountdown(3);
      },
      error: (err) => {
        console.error('Erro ao buscar o QR Code:', err);
      },
    });
  }

  copyPixCode() {
    navigator.clipboard.writeText(this.pixCode);
    alert('Código PIX copiado!');
  }

  getProgressColor(): string {
    // Vamos de azul escuro (240) → roxo (280) → vermelho (0)
    // Progresso de 100% até 0%

    let hue: number;

    if (this.progress > 50) {
      // De 100% até 50%: azul (240) até roxo (280)
      const range = 280 - 240; // 40
      const progressInRange = (100 - this.progress) / 50; // de 0 a 1
      hue = 240 + range * progressInRange;
    } else {
      // De 50% até 0%: roxo (280) até vermelho (0)
      const range = 280; // de 280 a 0
      const progressInRange = (50 - this.progress) / 50; // de 0 a 1
      hue = 280 - range * progressInRange;
    }

    return `hsl(${hue}, 100%, 50%)`;
  }
}
