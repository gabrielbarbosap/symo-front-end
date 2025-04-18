import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../../shared/hero/hero.component';
import { LoteryService } from '../../services/lotery.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  lotery: any;
  constructor(private loteryService: LoteryService) {}

  ngOnInit(): void {
    this.getLottery();
  }

  getLottery(): void {
    this.loteryService.getLoteries().subscribe({
      next: (response) => {
        this.lotery = response.data[0];
        console.log(this.lotery);
      },
      error: (error) => {
        console.error('Erro ao buscar dados do sorteio:', error);
      },
    });
  }
}
