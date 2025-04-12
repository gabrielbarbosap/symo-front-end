import { Injectable } from '@angular/core';
import { signal } from '@angular/core'; // Importando a função 'signal'
import { computed } from '@angular/core'; // Para criar valores computados a partir de signals

/**
 * Representa um item no carrinho de compras.
 */
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

/**
 * Serviço responsável por gerenciar as operações do carrinho de compras.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Signal que mantém o estado atual do carrinho
  private cartSignal = signal<CartItem[]>([]);

  // Signal que computa o total do carrinho
  cartTotal = computed(() => this.cartSignal().reduce((acc, item) => acc + item.price * item.quantity, 0));

  /**
   * Construtor do serviço `CartService`.
   */
  constructor() {}

  /**
   * Adiciona um item ao carrinho de compras.
   * Se o item já existir, aumenta a quantidade. Caso contrário, adiciona o item ao carrinho.
   *
   * @param item O item a ser adicionado ao carrinho.
   */
  addToCart(item: CartItem): void {
    const currentCart = this.cartSignal();
    const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    // Atualiza o estado do carrinho
    this.cartSignal.set([...currentCart]);
  }

  /**
   * Remove um item do carrinho com base no seu ID.
   *
   * @param itemId O ID do item a ser removido do carrinho.
   */
  removeFromCart(itemId: number): void {
    const updatedCart = this.cartSignal().filter((item) => item.id !== itemId);

    // Atualiza o estado do carrinho
    this.cartSignal.set(updatedCart);
  }

  /**
   * Limpa todos os itens do carrinho de compras.
   * Atualiza o carrinho para um array vazio.
   */
  clearCart(): void {
    this.cartSignal.set([]);
  }

  /**
   * Retorna o estado atual do carrinho de compras.
   *
   * @returns O estado atual do carrinho como um array de itens.
   */
  getCartItems(): CartItem[] {
    return this.cartSignal();
  }

  /**
   * Retorna o total do carrinho de compras.
   *
   * @returns O total do carrinho.
   */
  getTotal(): number {
    return this.cartTotal();
  }
}
