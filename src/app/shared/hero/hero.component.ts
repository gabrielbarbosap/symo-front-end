import { Component, HostListener, OnInit } from '@angular/core';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [HeroBannerComponent, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit {
  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // define breakpoint para "mobile"
  }
}
