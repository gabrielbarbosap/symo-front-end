import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

/**
 * Serviço responsável por manipular o tema da aplicação.
 * Ele permite alternar entre o tema customizado e o tema claro,
 * além de salvar e recuperar a preferência do usuário.
 */
@Injectable({
  providedIn: 'root', // O serviço estará disponível globalmente em toda a aplicação
})
export class ThemeService {
  private renderer: Renderer2;

  /**
   * Construtor do serviço ThemeService.
   * O Renderer2 é injetado usando o RendererFactory2 para criar uma instância
   * que pode ser usada para modificar o DOM, especialmente o elemento <body>.
   *
   * @param rendererFactory O RendererFactory2 usado para criar uma instância do Renderer2
   */
  constructor(rendererFactory: RendererFactory2) {
    // Criação do Renderer2 para manipulação do DOM
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Altera o tema da aplicação para o tema customizado ou claro e salva a preferência do usuário.
   * Quando o parâmetro theme é 'custom', a classe 'custom-theme' é adicionada ao elemento <body>,
   * ativando o tema customizado. Quando o tema é 'light', a classe 'light-theme' é aplicada.
   * A preferência do tema é salva no localStorage para persistir entre as sessões do usuário.
   *
   * @param theme O tema a ser aplicado. Aceita os valores 'custom' para tema customizado
   *              e 'light' para tema claro.
   */
  setTheme(theme: 'light' | 'custom'): void {
    // Limpa temas anteriores
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'custom-theme');

    // Armazena a preferência do tema no localStorage
    localStorage.setItem('theme', theme);

    // Aplica a classe correspondente ao tema
    if (theme === 'custom') {
      this.renderer.addClass(document.body, 'custom-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
    }
  }

  /**
   * Obtém o tema armazenado no localStorage ou usa o valor padrão ('light') se não houver preferência.
   * Esse método é chamado na inicialização para definir o tema correto.
   *
   * @returns O tema armazenado no localStorage. Pode retornar 'light' ou 'custom'.
   */
  getSavedTheme(): 'light' | 'custom' {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? (savedTheme as 'light' | 'custom') : 'light';
  }

  /**
   * Aplica o tema salvo no localStorage ao carregar a aplicação.
   * Isso garante que o tema do usuário seja carregado ao acessar o app.
   */
  applySavedTheme(): void {
    const theme = this.getSavedTheme();
    this.setTheme(theme); // Aplica o tema
  }
}
