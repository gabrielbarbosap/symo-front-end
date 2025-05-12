import { Component, HostListener, Input, OnInit } from '@angular/core';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';
import { CommonModule } from '@angular/common';
import { LoteryItem } from '../../services/lotery.service';
import { QuotaSalePageComponent } from '../../pages/quota-sale-page/quota-sale-page.component';

@Component({
  selector: 'app-hero',
  imports: [HeroBannerComponent, CommonModule, QuotaSalePageComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit {
  isMobile = false;
  @Input() lotery!: LoteryItem;

  ngOnInit() {
    console.log(this.lotery);
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
