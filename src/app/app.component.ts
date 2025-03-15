import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { ThemeService } from './services/theme.service';
import { FooterComponent } from './shared/footer/footer.component';
import { HeroComponent } from './shared/hero/hero.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'symo';
  constructor(private themeService: ThemeService) {}

  toggleTheme(isDark: boolean) {
    this.themeService.setTheme(isDark ? 'dark' : 'light');
  }
}
