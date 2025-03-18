import { Component } from '@angular/core';
// import { HeaderComponent } from './shared/header/header.component';
import { ThemeService } from './services/theme.service';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
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
