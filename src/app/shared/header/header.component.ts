import { Component } from '@angular/core';
import { TopBannerComponent } from '../top-banner/top-banner.component';
import { LoginComponent } from '../login/login.component';

/**
 * Componente responsável pela exibição da barra de navegação no topo da aplicação.
 * Este componente pode incluir elementos como o título do site, links de navegação e ícones de ações.
 */
@Component({
  selector: 'app-header',
  imports: [TopBannerComponent, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // Este componente geralmente será utilizado para exibir o cabeçalho com elementos de navegação
}
