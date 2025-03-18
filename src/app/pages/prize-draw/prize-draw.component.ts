import { Component } from '@angular/core';
import { HeaderPrizeDrawComponent } from '../../shared/header-prize-draw/header-prize-draw.component';
import { CardPrizeDrawComponent } from '../../shared/card-prize-draw/card-prize-draw.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-prize-draw',
  imports: [HeaderPrizeDrawComponent, CardPrizeDrawComponent, BreadcrumbComponent],
  templateUrl: './prize-draw.component.html',
  styleUrl: './prize-draw.component.css',
})
export class PrizeDrawComponent {
  cards = [
    {
      status: 'open',
      badges: [
        { text: 'Edição 01', color: '#FFFFFF', bgColor: '#2E2170' },
        { text: '12/12/2024 - 19:30', color: '#2E2170', bgColor: '#C4CCE4' },
        { text: 'Cota R$ 2,29', color: '#2E2170', bgColor: '#12D1DE' },
      ],
    },
    {
      status: 'participating',
      badges: [
        { text: 'Edição 01', color: '#FFFFFF', bgColor: '#2E2170' },
        { text: '12/12/2024 - 19:30', color: '#2E2170', bgColor: '#C4CCE4' },
        { text: 'Cota R$ 2,29', color: '#2E2170', bgColor: '#12D1DE' },
      ],
    },
    {
      status: 'open',
      badges: [
        { text: 'Edição 01', color: '#FFFFFF', bgColor: '#2E2170' },
        { text: '12/12/2024 - 19:30', color: '#2E2170', bgColor: '#C4CCE4' },
        { text: 'Premiado', color: '#2E2170', bgColor: '#FFB800' },
      ],
    },
    {
      status: 'completed',
      badges: [
        { text: 'Edição 01', color: '#FFFFFF', bgColor: '#2E2170' },
        { text: '12/12/2024 - 19:30', color: '#2E2170', bgColor: '#C4CCE4' },
        { text: 'Premiado', color: '#FFFFFF', bgColor: '#8C6BFA' },
      ],
    },
    {
      status: 'comingSoon',
      badges: [
        { text: 'Edição 01', color: '#FFFFFF', bgColor: '#2E2170' },
        { text: '12/12/2024 - 19:30', color: '#2E2170', bgColor: '#C4CCE4' },
        { text: 'Premiado', color: '#2E2170', bgColor: '#FFB800' },
      ],
    },
    {
      status: 'comingSoon',
      badges: [
        { text: 'Edição 01', color: '#FFFFFF', bgColor: '#2E2170' },
        { text: '12/12/2024 - 19:30', color: '#2E2170', bgColor: '#C4CCE4' },
        { text: 'Premiado', color: '#2E2170', bgColor: '#FFB800' },
      ],
    },
  ];
}
