import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { QuotaService } from '../../services/quota.service';
import { QuotaSelectionComponent } from '../quota-selection/quota-selection.component';
import { ProgressComponent } from '../progress/progress.component';
import { ButtonComponent } from '../button/button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTicket } from '@ng-icons/bootstrap-icons';
import { LoteryItem, LoteryService } from '../../services/lotery.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, QuotaSelectionComponent, ProgressComponent, ButtonComponent, NgIcon],
  viewProviders: [
    provideIcons({
      bootstrapTicket,
    }),
  ],
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css'],
})
export class HeroBannerComponent implements OnInit {
  @Input() title: string = 'Caroço da Sorte: 3.000,00 Reais no seu bolso';
  @Input() edition: string = 'EDIÇÃO 01';
  @Input() date: string = '17/05/2025 – 19:00 ';
  @Input() price: number = 3;
  @Input() soldPercentage: number = 75;
  @Input() daysLeft: number = 12;
  @Input() hours: number = 12;
  @Input() minutes: number = 34;
  @Input() seconds: number = 3;
  @Input() isMobile: boolean = false;

  @Input() lotery!: LoteryItem;

  @Output() dataLotery = new EventEmitter<any>();
  @Input()
  uuid!: string; // Identificação do sorteio

  private _selectedQuotes: number = 0;
  options: number[] = [100, 200, 300, 400];
  totalPrice: any;
  constructor(
    private quotaService: QuotaService,
    private cartService: CartService,
    private loteryService: LoteryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.quotaService.getQuotaState$(this.uuid).subscribe((state) => {
      this.selectedQuotes = state.selectedQuotes;
    });
    this.getLottery();
  }

  getLottery(): void {
    console.log(this.lotery);
    this.title = this.lotery.descricao;
    this.price = this.lotery.valor;
    this.date = this.formatDate(this.lotery.dataSorteio ?? '');
    this.soldPercentage = this.calculateSoldPercentage(this.lotery.numeroInicial, this.lotery.numeroFinal);
    this.totalPrice = this.lotery.valor * 5;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }) +
      ' – ' +
      date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }

  private calculateSoldPercentage(inicial: number, final: number): number {
    const vendidos = 3750;
    const total = final - inicial;
    return Math.round((vendidos / total) * 100);
  }

  get selectedQuotes(): number {
    return this._selectedQuotes;
  }

  set selectedQuotes(value: number) {
    this._selectedQuotes = Math.round(value);
  }

  emitPrice(event: any) {
    this.totalPrice = 0;
    this.totalPrice = event;
  }

  openSelection(): void {
    if (this.selectedQuotes === 0) {
      this.selectedQuotes = 1;
    }
  }

  addQuotes(amount: number): void {
    const newQuotes = this.selectedQuotes + amount;
    this.quotaService.updateSelectedQuotes(this.uuid, newQuotes);
  }

  increaseQuotes(): void {
    const newQuotes = Math.min(10000, this.selectedQuotes + 1);
    this.quotaService.updateSelectedQuotes(this.uuid, newQuotes);
  }

  decreaseQuotes(): void {
    const newQuotes = Math.max(1, this.selectedQuotes - 1);
    this.quotaService.updateSelectedQuotes(this.uuid, newQuotes);
  }

  toSaleBag() {
    const quantity = this.totalPrice / this.lotery.valor;
    console.log(quantity);
    const itemCart = {
      id: this.lotery.id,
      name: this.lotery.descricao,
      price: this.lotery.valor,
      quantity: quantity,
    };
    this.cartService.addToCart(itemCart);

    const bodyOrder = {
      idRifa: this.lotery.id,
      quantidade: quantity,
    };
    sessionStorage.setItem('loteryData', JSON.stringify(this.lotery));

    this.loteryService.generateOrder(bodyOrder).subscribe({
      next: (response) => {
        this.router.navigate(['/bag'], {
          queryParams: {
            quantidade: this.totalPrice / this.lotery.valor,
            sorteio: this.lotery.id,
            pedido: response.id,
          },
        });
      },
      error: (err) => {
        console.error('Erro ao gerar pedido:', err);
      },
    });
  }
}
