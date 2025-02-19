import { Component } from '@angular/core';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';

@Component({
  selector: 'app-hero',
  imports: [HeroBannerComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {}
