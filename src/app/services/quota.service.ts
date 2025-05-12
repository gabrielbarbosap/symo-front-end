import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Serviço que gerencia o estado das cotas para diferentes sorteios, identificados por UUID.
 * Responsável por armazenar e manipular a quantidade de cotas selecionadas,
 * o preço total, o progresso de vendas, etc., para cada sorteio individual.
 */
@Injectable({
  providedIn: 'root',
})
export class QuotaService {
  private pricePerQuota: number = 3.0;

  // Mapa para armazenar o estado das cotas de cada sorteio, identificado por UUID.
  private quotaStateMap: Map<string, BehaviorSubject<QuotaState>> = new Map();

  /**
   * Atualiza o estado das cotas para um sorteio específico.
   * @param uuid Identificador único do sorteio.
   * @param selectedQuotes Número de cotas selecionadas.
   */
  updateSelectedQuotes(uuid: string, selectedQuotes: number): void {
    const state = this.getOrCreateQuotaState(uuid);
    const totalPrice = selectedQuotes * this.pricePerQuota;
    const progress = (selectedQuotes / 10000) * 100; // Exemplo de cálculo de progresso

    state.selectedQuotes = selectedQuotes;
    state.totalPrice = totalPrice;
    state.progress = progress;

    this.quotaStateMap.get(uuid)!.next(state); // Emite o novo estado
  }

  /**
   * Retorna o estado das cotas para um sorteio específico, criando um novo estado se necessário.
   * @param uuid Identificador único do sorteio.
   * @returns O estado das cotas para o sorteio.
   */
  private getOrCreateQuotaState(uuid: string): QuotaState {
    if (!this.quotaStateMap.has(uuid)) {
      const initialState: QuotaState = { selectedQuotes: 5, totalPrice: this.pricePerQuota * 5, progress: 0 };
      this.quotaStateMap.set(uuid, new BehaviorSubject<QuotaState>(initialState));
    }
    return this.quotaStateMap.get(uuid)!.value;
  }

  /**
   * Retorna um observable para o estado das cotas de um sorteio específico.
   * @param uuid Identificador único do sorteio.
   * @returns Um observable do estado das cotas.
   */
  getQuotaState$(uuid: string) {
    if (!this.quotaStateMap.has(uuid)) {
      this.getOrCreateQuotaState(uuid); // Cria o estado se não existir.
    }
    return this.quotaStateMap.get(uuid)!.asObservable();
  }

  /**
   * Reseta as cotas selecionadas para um sorteio específico.
   * @param uuid Identificador único do sorteio.
   */
  resetQuotes(uuid: string): void {
    this.updateSelectedQuotes(uuid, 0);
  }

  // Preço por cota
}

/**
 * Representa o estado das cotas de um sorteio.
 */
interface QuotaState {
  selectedQuotes: number;
  totalPrice: number;
  progress: number;
}
