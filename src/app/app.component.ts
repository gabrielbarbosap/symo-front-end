import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { ThemeService } from './services/theme.service';
import { FooterComponent } from './shared/footer/footer.component';
import { HeroComponent } from './shared/hero/hero.component';
import { SweepstakesGridComponent } from './shared/sweepstakes-grid/sweepstakes-grid.component';
import { WinnersGridComponent } from './shared/winners-grid/winners-grid.component';
import { FloatingMenuComponentComponent } from './shared/floating-menu-component/floating-menu-component.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    SweepstakesGridComponent,
    WinnersGridComponent,
    FloatingMenuComponentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'symo';

  constructor(private themeService: ThemeService) {}

  /**
   * Alterna entre os temas 'custom' e 'light'.
   *
   * @param isCustom - Se true, aplica o tema customizado, caso contrário, aplica o tema claro.
   */
  toggleTheme(isCustom: boolean) {
    this.themeService.setTheme(isCustom ? 'custom' : 'light');
  }
}
