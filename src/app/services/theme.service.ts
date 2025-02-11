import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

/**
 * Serviço responsável por manipular o tema da aplicação.
 * Ele permite alternar entre o tema escuro e o tema claro,
 * adicionando ou removendo a classe 'dark' no elemento `<body>`.
 */
@Injectable({
  providedIn: 'root', // O serviço estará disponível globalmente em toda a aplicação
})
export class ThemeService {
  // O Renderer2 é usado para modificar o DOM de forma segura e eficiente
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
   * Altera o tema da aplicação para o modo escuro ou claro.
   * Quando o parâmetro isDark é `true`, a classe 'dark' é adicionada ao elemento <body>,
   * ativando o tema escuro. Caso contrário, a classe 'dark' é removida, ativando o tema claro.
   *
   * @param isDark Booleano que indica se o tema deve ser escuro (true) ou claro (false)
   */
  setTheme(theme: 'light' | 'dark'): void {
    // Se o tema deve ser escuro, adiciona a classe 'dark' ao <body>
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark');
      return;
    }

    // Caso contrário, remove a classe 'dark' do <body>
    this.renderer.removeClass(document.body, 'dark');
  }
}
