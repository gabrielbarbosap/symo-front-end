import { Component, Input, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'; // Importando o gerador de UUID v4
import { QuotaService } from '../../services/quota.service';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';

/**
 * Componente para a seleção de cotas de um sorteio específico.
 * Permite ao usuário selecionar um número de cotas e atualizar o estado
 * das cotas selecionadas para o sorteio.
 */
@Component({
  imports: [NgIf, NgFor, ButtonComponent, NgClass, FormsModule, CurrencyPipe],
  selector: 'app-quota-selection',
  templateUrl: './quota-selection.component.html',
  styleUrls: ['./quota-selection.component.css'],
})
export class QuotaSelectionComponent implements OnInit {
  @Input() context: 'hero' | 'card' = 'hero'; // Define onde o componente está sendo usado

  selectedQuotes: number = 0;
  totalPrice: number = 0;
  progress: number = 0;
  uuid: string = '';
  quotas: any = [200, 400, 600, 1000, 5000, 10000]; // Exemplo de quotas

  /**
   * Injeta o serviço QuotaService para gerenciar o estado das cotas.
   * @param quotaService Serviço para manipulação das cotas.
   */
  constructor(private quotaService: QuotaService) {}

  /**
   * Gera um UUID único para o sorteio.
   * Esse UUID pode ser utilizado para identificar de forma única
   * os dados relacionados ao sorteio atual.
   */
  private generateUUID(): void {
    this.uuid = uuidv4(); // Gerando um UUID único com a função v4 do uuid
  }

  /**
   * Subscrição aos observables do QuotaService para receber os valores
   * atualizados de cotas, preço e progresso para o sorteio com o UUID fornecido.
   */
  ngOnInit(): void {
    this.generateUUID(); // Gerar o UUID ao inicializar o componente
    this.quotaService.getQuotaState$(this.uuid).subscribe((state) => {
      this.selectedQuotes = state.selectedQuotes;
      this.totalPrice = state.totalPrice;
      this.progress = state.progress;
    });
  }

  /**
   * Método para atualizar o número de cotas selecionadas.
   * @param amount Número de cotas a adicionar
   */
  selectQuota(amount: number): void {
    this.selectedQuotes += amount;
    this.updateQuotaState();
  }

  /**
   * Método para limpar as cotas selecionadas.
   */
  resetSelection(): void {
    this.selectedQuotes = 0;
    this.updateQuotaState();
  }

  /**
   * Atualiza o estado das cotas com o valor atual de `selectedQuotes` no serviço.
   */
  public updateQuotaState(): void {
    this.quotaService.updateSelectedQuotes(this.uuid, this.selectedQuotes);
  }

  /**
   * Aumenta a quantidade de cotas em 1.
   */
  increaseQuantity(): void {
    this.selectedQuotes++;
    this.updateQuotaState();
  }

  /**
   * Diminui a quantidade de cotas em 1, garantindo que nunca seja menor que 0.
   */
  decreaseQuantity(): void {
    if (this.selectedQuotes > 0) {
      this.selectedQuotes--;
      this.updateQuotaState();
    }
  }
}
