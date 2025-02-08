import { Component } from '@angular/core';
import { TopBannerComponent } from '../top-banner/top-banner.component';

/**
 * Componente responsável pela exibição da barra de navegação no topo da aplicação.
 * Este componente pode incluir elementos como o título do site, links de navegação e ícones de ações.
 */
@Component({
  selector: 'app-header', // Seletor para usar o componente no template
  imports: [TopBannerComponent], // Não há dependências importadas
  templateUrl: './header.component.html', // Arquivo de template HTML para o layout do componente
  styleUrl: './header.component.css', // Arquivo de estilos CSS para o layout do componente
})
export class HeaderComponent {
  // Este componente geralmente será utilizado para exibir o cabeçalho com elementos de navegação
}
